const { accountSid, authToken, verifySid } = require("./config");

const client = require("twilio")(accountSid, authToken);
 
exports.sendOtpHandle = async function (mobile) {
 
   try{
    const status = await client.verify.v2.services(verifySid).
    verifications.create({ to: "+91"+mobile, channel: "sms" })
    return true
   }catch(e){
     console.log('e',e)
   return false
   }

  }

  exports.verifyOtpHandle = async function (mobile,otp) {
    
   try{
    const res =  await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: "+91"+mobile, code: otp })
     return res?.valid
   
  
   }catch(e){
    return false
   }

      }