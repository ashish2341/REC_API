const User = require("../../models/userModel");
const constants = require("../../helper/constants");
const Login = require("../../models/loginModel");
const bcrypt = require('bcryptjs');
const { PORT } = require("../../helper/config");
const { sendOtpHandle, verifyOtpHandle } = require("../../helper/otp");
const Role = require("../../models/roleModel");
const Developer = require('../../models/developerModel')
const { errorResponse } = require("../../helper/responseTransformer");
const config = require('../../helper/config')
const jwt =require ('jsonwebtoken');
const FAQ = require("../../models/faqModel");
const csv = require('csvtojson');
const Property = require('../../models/propertiesModel');
const fs = require('fs');
// const csv = 
// Register an user
exports.register = async (req, res) => {
  try {
     const {Password,Role:role,...restBody} = req.body
     const roleId = await Role.findOne({Role:role})
     if(!roleId){
      return res.status(constants.status_code.header.ok).send({ statusCode: 200, error: "Role is not exist in DB",success:false });
     }
    const user = new User({...restBody,Roles:[roleId._id]});
 
    await user.save();
      const login = new Login({
        Mobile:req.body.Mobile,
        Password,
        UserId: user._id
    });
    await login.save();
    // save builder profile
    if(role=='Developer'){
         const developerObj = new Developer({Name:req.body.FirstName,UserId:user._id})
         await developerObj.save()
    }
    return res.status(constants.status_code.header.ok).send({ message: constants.auth.register_success,success:true});
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({ error: errorResponse(error),success:false });
  }
};

exports.login = async (req, res) => {
  try {
    const { Mobile, Password } = req.body;
   
    const user = await Login.findOne({ Mobile }).populate("UserId");
    console.log('user new ',user)
    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(Password, user.Password))) {
      return res.status(401).json({ success:false, error: 'Invalid Mobile or Password' });
    }

    const signUpData = await User.findById(user.UserId._id).populate("Roles");
        
    const userRoles = signUpData.Roles.map(role => role.Role);
    const token = jwt.sign({ _id: signUpData._id, roles:userRoles }, config.JWT_KEY)
    // Send token in response
    res.status(constants.status_code.header.ok).send({ 
      success:true, 
      message: token,
      userId: signUpData._id,
      firstName: signUpData.FirstName,
      role: userRoles,
      profilePhoto: signUpData.ProfilePhoto
      
     });
  } catch (error) {

    return res.status(constants.status_code.header.server_error).send({ success:false, error: error.message });
  }
};

exports.uploadSingleImage = async (req, res) => {
  try {
    // const portPath = req.hostname === "localhost" ? `:${PORT}/uploads/${req.file.filename}`: `/uploads/${req.file.filename}`
    // const imageUrl = `${req.protocol}://${req.hostname}${portPath}`;
    res.status(200).send({ imageUrl:req.file.filename, success: true });
  } catch (error) {

    return res.status(500).json({ error: error.message, success: false });
  }
}

// exports.csvFileUploads = async (req, res) => {
//   try {
//     var Data = [];
//     csv()
//     .fromFile(req.file.path)
//     .then(async(res)=>{
//       console.log(res)
//       for(var x=0;x<res.length;x++){
//         Data.push({
//           Subject:res[x].field1,
//           Answer:res[x].field2,
//           Categories:res[x].field3
//         })
//       }
//       await FAQ.insertMany(Data)
//     })
//     res.status(200).send({ imageUrl:req.file.filename, success: true });
//   } catch (error) {

//     return res.status(500).json({ error: error.message, success: false });
//   }
// }


exports.csvFileUploads = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded', success: false });
    }
    const mongoose = require('mongoose');
    const csvFilePath = req.file.path;
    const jsonArray = await csv().fromFile(csvFilePath);
    const DEFAULT_FEATURES = [new mongoose.Types.ObjectId('6617b657bf11c18a9a7cfc15')];
    const DEFAULT_AMINITIES = [new mongoose.Types.ObjectId('661e4404ea049beeabafa5ff')];
    const DEFAULT_FACING = [new mongoose.Types.ObjectId('66225fee21f766d4d73181c7')];
     
     
    const propertyData = await Promise.all(jsonArray.map(async (row, index) =>{
      let sellerId = null;
      if (row.Sellers) {
        const sellerName = row.Sellers.trim();
      

      const findDeveloper = await Developer.findOne({Name: sellerName});
      if(!findDeveloper){
        const user = new User({ 
          FirstName: sellerName,
          Roles: ['6631d7b30a88f22a73795b47'], 
          Mobile:'9087654320',
          EmailId:"alkgmail.com"
         });
          
          await user.save();

          const developer = new Developer({ 
           Name: sellerName,
           Mobile: '9087654320',
           EmailId: "alkgmail.com",
           WhatsApp: '9087654320'
           });
           await developer.save()

          const login = new Login({
            Mobile: '9087654320', 
            Password: '123', 
            UserId: user._id
          });
          await login.save()
      
       

        sellerId = user._id;
      }
    }
      const [Latitude, Longitude] = row.Coordinates ? row.Coordinates.split(',').map(coord => coord.trim()) : [null, null];
      return {
        Title: row.Title,
        Description: row.Description,
        Highlight: row.Highlights,
        // ProeprtyFor: row.ProeprtyFor,
        // ProeprtyType: row.ProeprtyType,
        // ProjectId: row.ProjectId,
        // PropertySubtype: row.PropertySubtype,
        IsDeleted: row.IsDeleted === 'true',
        IsEnabled: row.IsEnabled === 'true',
        IsExclusive: row.IsExclusive === 'true',
        IsFeatured: row.IsFeatured === 'true',
        IsNew: row.IsNew === 'true',
        Features: row.Feature ? JSON.parse(row.Feature) : DEFAULT_FEATURES,
        Aminities: row.Aminities ? JSON.parse(row.Aminities) : DEFAULT_AMINITIES,
        Facing: row.Facing ? JSON.parse(row.Facing) : DEFAULT_FACING,
        // AreaUnits: row.AreaUnits,
        // Builder: row.Builder,
        // BhkType: row.BhkType,
        // Area: row.Area,
        // Fencing: row.Fencing,
        // Flooring: row.Flooring,
        // Furnished: row.Furnished,
        // BuiltAreaType: row.BuiltAreaType,
        City: row.City,
        // State: row.State,
        // Country: row.Country,
        Address: row.Address,
        // Landmark: row.Landmark,
        // PinCode: row.PinCode,
        Location: {
          Latitude: Latitude,
          Longitude: Longitude
        },
        // CreatedDate: row.CreatedDate ? new Date(row.CreatedDate) : new Date(),
        CreatedBy: sellerId,
        // UpdatedDate: row.UpdatedDate ? new Date(row.UpdatedDate) : new Date(),
        // UpdatedBy: row.UpdatedBy,
        // Bedrooms: Number(row.Bedrooms),
        // Bathrooms: Number(row.Bathrooms),
        // LandArea: Number(row.LandArea),
        // CoveredArea: Number(row.CoveredArea),
        // CarpetArea: Number(row.CarpetArea),
        TotalPrice: {
          DisplayValue: row.DisplayPrice,
        //   MinValue: Number(row.TotalPrice_MinValue),
        //   MaxValue: Number(row.TotalPrice_MaxValue),
        //   MinPriceUnit: row.TotalPrice_MinPriceUnit,
        //   MaxPriceUnit: row.TotalPrice_MaxPriceUnit
        },
        // PerUnitPrice: Number(row.PerUnitPrice),
        // LandAreaUnit: row.LandAreaUnit,
        // IsDisplayPrice: row.IsDisplayPrice === 'true',
        // IsNegotiable: row.IsNegotiable === 'true',
        // PosessionStatus: row.PosessionStatus,
        // PosessionDate: row.PosessionDate ? new Date(row.PosessionDate) : null,
        // FloorNumber: Number(row.FloorNumber),
        // TotalFloors: Number(row.TotalFloors),
        // IsSingleProperty: row.IsSingleProperty === 'true',
        // PricePerSquareFeet: Number(row.PricePerSquareFeet),
        // FloorsAllowed: Number(row.FloorsAllowed),
        // IsInterstedInJoinedVenture: row.IsInterstedInJoinedVenture === 'true',
        // Balconies: Number(row.Balconies),
        // Faq: row.Faq ? row.Faq.split(';').map(faq => {
        //   const [Question, Answer] = faq.split('|');
        //   return { Question, Answer };
        // }) : [],
        // ApprovedBy: row.ApprovedBy ? row.ApprovedBy.split(',').map(id => id.trim()) : [],
        // ReraNumber: row.ReraNumber,
        // Soil: row.Soil,
        // IsLoanable: row.IsLoanable === 'true',
        // IsAlreadyLoaned: row.IsAlreadyLoaned === 'true',
        // LoanDetails: {
        //   ByBank: row.LoanDetails_ByBank ? row.LoanDetails_ByBank.split(',').map(id => id.trim()) : [],
        //   LoanSince: row.LoanDetails_LoanSince ? new Date(row.LoanDetails_LoanSince) : null,
        //   LoanTill: row.LoanDetails_LoanTill ? new Date(row.LoanDetails_LoanTill) : null
        // },
        // OwnershipType: row.OwnershipType,
        // PropertyStatus: row.PropertyStatus,
      
        Images: [{
          URL: row.Images
        }],
        // Documents: row.Documents ? row.Documents.split(';').map(doc => {
        //   const [Name, Titile, URL, Type] = doc.split('|');
        //   return { Name, Titile, URL, Type };
        // }) : [],
        // Videos: row.Videos ? row.Videos.split(';').map(video => {
        //   const [Name, Titile, URL, Type] = video.split('|');
        //   return { Name, Titile, URL, Type };
        // }) : [],
        // IsSold: row.IsSold === 'true',
        // Preferences: row.Preferences ? row.Preferences.split(',').map(id => id.trim()) : [],
        //  DiscountPercentage: Number(row.ListingId),
        // DiscountForYears: Number(row.DiscountForYears),
        // Surveillance: row.Surveillance ? row.Surveillance.split(',') : [],
        // FloorAndCounter: {
        //   Dining: row.FloorAndCounter_Dining,
        //   MasterBedroom: row.FloorAndCounter_MasterBedroom,
        //   OtherBedroom: row.FloorAndCounter_OtherBedroom,
        //   Kitchen: row.FloorAndCounter_Kitchen,
        //   Toilets: row.FloorAndCounter_Toilets,
        //   Balcony: row.FloorAndCounter_Balcony
        // // },
        // Fitting: {
        //   Electrical: row.Fitting_Electrical,
        //   Toilets: row.Fitting_Toilets,
        //   Kitchen: row.Fitting_Kitchen,
        //   Doors: row.Fitting_Doors,
        //   Windows: row.Fitting_Windows,
        //   Others: row.Fitting_Others
        // },
        Brochure: row.BrochurePdf,
        // WallAndCeiling: {
        //   Interior: row.WallAndCeiling_Interior,
        //   Exterior: row.WallAndCeiling_Exterior,
        //   Kitchen: row.WallAndCeiling_Kitchen,
        //   Toilets: row.WallAndCeiling_Toilets
        // },
        // OwnerName: row.OwnerName,
        // SuitableFor: row.SuitableFor,
        // ZoneType: row.ZoneType,
        // LocationHub: row.LocationHub,
        // CustomLocationHub: row.CustomLocationHub,
        // CustomSuitable: row.CustomSuitable,
        // CustomZoneType: row.CustomZoneType,
        // BuiltUpArea: Number(row.BuiltUpArea),
        // PlotArea: Number(row.PlotArea),
        // PlotLength: Number(row.PlotLength),
        // Plotwidth: Number(row.Plotwidth),
        // WallType: row.WallType,
        // CellingHeight: Number(row.CellingHeight),
        // EntranceWidth: Number(row.EntranceWidth),
        // TaxCharge: row.TaxCharge === 'true',
        // LeasedOrRented: row.LeasedOrRented === 'true',
        // CurentRent: Number(row.CurentRent),
        // LeaseYears: Number(row.LeaseYears),
        // ExpectedReturn: Number(row.ExpectedReturn),
        // DgUpsCharge: row.DgUpsCharge === 'true',
        // AgeofProperty: Number(row.AgeofProperty),
        // Staircase: Number(row.Staircase),
        // passengerLifts: Number(row.passengerLifts),
        // ServiceLifts: Number(row.ServiceLifts),
        // PublicParking: Number(row.PublicParking),
        // PrivateParking: Number(row.PrivateParking),
        // PublicWashroom: Number(row.PublicWashroom),
        // PrivateWashroom: Number(row.PrivateWashroom),
        // CompletePercentage: Number(row.CompletePercentage),
        // PaymentPlan: row.PaymentPlan,
        // FloorPlan: row.FloorPlan,
        // CustomFencing: row.CustomFencing,
        // CustomFlooring: row.CustomFlooring,
        // CustomWallType: row.CustomWallType,
        AvgPrice:row.AvgPrice
      };
    }));

    await Property.insertMany(propertyData);

    // Clean up the uploaded file
    fs.unlink(csvFilePath, (err) => {
      if (err) console.error("Failed to delete uploaded file:", err);
    });

    res.status(200).send({
      message: "Data inserted successfully",
      success: true
    });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    res.status(500).json({
      error: error.message,
      success: false
    });
  }
};


exports.uploadMultipleFile = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded', success: false });
    }

    const imageUrls = [];
    req.files.forEach(file => {
      // const portPath = req.hostname === "localhost" ? `:${PORT}/uploads/${file.filename}`: `/uploads/${file.filename}`
      // const imageUrl = `${req.protocol}://${req.hostname}${portPath}`;
      imageUrls.push(req.file.filename);
    });

    res.status(200).send({ imageUrls, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
}


exports.sendOtp = async(req,res) => {
  try{
    const {Mobile} = req.body
    
      const otpRes = await sendOtpHandle(Mobile)
      if(otpRes){
        return res.status(200).send({ message: "Otp successfully send", success: true });
      }else{
        return res.status(500).send({ error: "Some thing went error", success: false });
      }
      
      
  }
   catch(error){
   return  res.status(500).json({ error: error.message, success: false });
   }

}
exports.verifyOtp = async(req,res) => {
  try{
    const {Mobile,Otp} = req.body
   
      const verfyRes = await verifyOtpHandle(Mobile,Otp)
      if(verfyRes){
        return res.status(200).send({ message: "Otp successfully verified", success: true });
      }else{
        return res.status(200).send({ error: "Otp is wrong", success: false });
      }
      
      
  }
   catch(error){
   return  res.status(500).json({ error: error.message, success: false });
   }

}

exports.forgetPassword = async(req,res) => {
  try{
    const {Mobile,NewPassword} = req.body
   
      const user = await  Login.findOne({Mobile})
      if(!user){
        return res.status(404).send({ error: "User is not exist", success: false});
      } 
    
    user.Password = NewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully',success:true });
      
  }
   catch(error){
    return res.status(500).json({ error: error.message, success: false });
   }

}





