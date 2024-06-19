const constants = require("../../helper/constants");
const Developer = require("../../models/developerModel");
const ProjectEnquiry = require("../../models/projectEnquiryModel");
const User = require("../../models/userModel");
const moment = require('moment');

exports.addProjectEnquiry = async (req, res) => {
  try {
    const { DeveloperId } = req.body;
    if (DeveloperId) {
      const developer = await Developer.findById(DeveloperId);
      const user = await User.findById(developer?.UserId);
     console.log(user)
      const projectEnquiry = await ProjectEnquiry.create({
        ...req.body,
        AllowedUser:[{Status:user?.IsEnquiryVisiable,UserId:developer?.UserId}]
      });
      return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
      
      
    }else{
    const projectEnquiry = await ProjectEnquiry.create(req.body);
    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
    }
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};

exports.getAllProjectEnquiry = async (req, res) => {
  
  try {
    const { page, pageSize,filter, startDate,endDate} = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const search = req.query.search || '';
    const todayEnquiryString = req.query.todayEnquiry || '';
       
    const searchQuery = {
        IsDeleted: false,
        IsEnabled: true,
        $or: [
            { Name: { $regex: search, $options: 'i' } }, 
            { Email: { $regex: search, $options: 'i' } }, 
            { Message: { $regex: search, $options: 'i' } }, 
        ]
    };

    if (filter) {
      searchQuery.EnquiryType = filter;
  }
  
 if(todayEnquiryString == 'yes'){
          const startOfToday = moment().startOf('day').toDate();
          const endOfToday = moment().endOf('day').toDate();
          searchQuery.CreatedDate = { $gte: startOfToday, $lt: endOfToday }
          delete searchQuery.IsEnabled;
          if(searchQuery.EnquiryType===""){
            delete searchQuery.EnquiryType 
          }
        }
  if (startDate && endDate) {
    searchQuery.EnquiryDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
    const totalCount = await ProjectEnquiry.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / size);

    const records = await ProjectEnquiry.find(searchQuery)
      .populate('PropertyId')
      .sort({ EnquiryDate: -1 })
      .skip((pageNumber - 1) * size)
      .limit(size);
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: records,
      success: true,
      totalCount: totalCount,
      count: records.length,
      pageNumber: pageNumber,
      totalPages: totalPages,
    });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.getProjectEnquiryById = async (req, res) => {
  try {
    const projectEnquiry = await ProjectEnquiry.findById(req.params.id);
    if (!projectEnquiry) {
      return res
        .status(404)
        .json({ error: "ProjectEnquiry not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: projectEnquiry, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateProjectEnquiry = async (req, res) => {
  try {
    const payload = {...req.body}
    if(req.body.AllowedUser){
      const userStatusMap = new Map();
      const users = await User.find({ _id: { $in: req.body.AllowedUser } }, { _id: 1, IsEnquiryVisiable: 1 });
      users.forEach(user => {
          userStatusMap.set(user._id.toString(), user.IsEnquiryVisiable);
      });
     
  
      
      payload.AllowedUser =  req.body.AllowedUser.map(userId => ({
        UserId: userId,
        Status: userStatusMap.get(userId.toString()) || false 
    }));
    payload.IsActionTaken = true
    }
  
    const projectEnquiry = await ProjectEnquiry.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    return res
    .status(constants.status_code.header.ok)
    .send({ statusCode: 200, message: constants.curd.update, success: true });
} catch (error) {
  return res
  .status(constants.status_code.header.server_error)
  .send({ statusCode: 500, error: error.message, success: false });
}
};

exports.deleteProjectEnquiry = async (req, res) => {
  try {
    const projectEnquiry = await ProjectEnquiry.findByIdAndUpdate(req.params.id,{
        IsDeleted: true,
    });
    if (!projectEnquiry) {
      return res
        .status(404)
        .json({ error: "ProjectEnquiry not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

 
exports.getEnquiryByDeveloperId = async (req, res) => {
  try {
   const builder = await Developer.findOne({UserId:req.user._id});
   if (!builder) {
    return res
      .status(404)
      .json({ error: "Builder not found", success: false });
  }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const todayEnquiryString = req.query.todayEnquiryString || '';
    const typeEnquiry = req.query.type || '';
    const searchQuery = {
      IsDeleted: false,
      $or: [
        { "AllowedUser.UserId": req.user._id },
      ]
    };
    if(todayEnquiryString == 'yes'){
      const startOfToday = moment().startOf('day').toDate();
      const endOfToday = moment().endOf('day').toDate();
      searchQuery.CreatedDate = { $gte: startOfToday, $lt: endOfToday }
    }

    if(typeEnquiry){
      searchQuery.EnquiryType = typeEnquiry;
    }
    let sortOptions = { CreatedDate: -1 };

    const count = await ProjectEnquiry.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit;

    const enquiries = await ProjectEnquiry.find(searchQuery).populate({path:"PropertyId",select:"_id Titile"})
      .sort(sortOptions)
      .skip(skip<0 ? 1 : skip)
      .limit(limit);
    
     
      
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: enquiries,
      currentPage: currentPage,
      totalPages: totalPages,
      totalCount: count,
      success: true
    });

  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({
      statusCode: 500,
      error: error.message,
      success: false
    });
  }
};