import Student from "../models/student.model.js";
import Address from "../models/student_address.model.js";
import Contact from "../models/student_contact.model.js";
import Other from "../models/student_other_details.model.js";
import Document from "../models/student_documents.model.js";
import Group from "../models/student_group.model.js";

export const studentregistration = async (req, res) => {
    const {
        studentname, mothername, fathername, dob, gender, adharnumber, interhallticketnumber, intergroup, tenthhallticketnumber,
        houseno, district, street, secretriat, mandal, pincode, village,
        mobilenumber, parentnumber, guardiannumber, email,
        religion, caste, category, physicallychallenged, castecertificatenumber, incomecertificatenumber, ewsnumber, ricecardnumber, motheradharnumber, bankname, bankifsccode, accountno,
        sscmarksheet, intermarksheet, studentadharcard, motheradharcard, castecertificate, rationcard, incomecertificate, motherbankpassbook, studentphoto,
        group, secondlanguage
    } = req.body.formData;

    console.log({ studentname, mothername, fathername, dob, gender, adharnumber, interhallticketnumber, intergroup, tenthhallticketnumber });
    console.log("address details:", { houseno, district, street, secretriat, mandal, pincode, village });
    console.log("contact details:", { mobilenumber, parentnumber, guardiannumber, email });
    console.log("other details:", { religion, caste, category, physicallychallenged, castecertificatenumber, incomecertificatenumber, ewsnumber, ricecardnumber, motheradharnumber, bankname, bankifsccode, accountno });
    console.log("documents:", { sscmarksheet, intermarksheet, studentadharcard, motheradharcard, castecertificate, rationcard, incomecertificate, motherbankpassbook, studentphoto });

    try {
        // Check for duplicate records
        const duplicateChecks = [
            { field: 'interhallticketnumber', value: interhallticketnumber, model: Student, message: "Student already exists with this inter hall ticket number" },
            { field: 'tenthhallticketnumber', value: tenthhallticketnumber, model: Student, message: "Student already exists with this tenth hall ticket number" },
            { field: 'adharnumber', value: adharnumber, model: Student, message: "Student already exists with this Aadhar number" },
            { field: 'email', value: email, model: Contact, message: "User already exists with this email" },
            { field: 'castecertificatenumber', value: castecertificatenumber, model: Other, message: "Student already exists with this caste certificate number" },
            { field: 'incomecertificatenumber', value: incomecertificatenumber, model: Other, message: "Student already exists with this income certificate number" },
            { field: 'accountno', value: accountno, model: Other, message: "Student already exists with this account number" },
            { field: 'ewsnumber', value: ewsnumber, model: Other, message: "Student already exists with this EWS number" },
        ];

        for (const check of duplicateChecks) {
            const existingRecord = await check.model.findOne({ [check.field]: check.value });
            if (existingRecord) {
                return res.status(400).json({ error: check.message });
            }
        }

        // Save new student record
        const newstudent = new Student({ studentname, mothername, fathername, dob, gender, adharnumber, interhallticketnumber, tenthhallticketnumber,intergroup });
        await newstudent.save();
        const id = newstudent._id.toString();

        // Save related records
        const newaddress = new Address({ houseno, district, street, secretriat, mandal, pincode, village, student: id });
        await newaddress.save();

        const newcontact = new Contact({ mobilenumber, parentnumber, guardiannumber, email, student: id });
        await newcontact.save();

        const newother = new Other({ religion, caste, category, physicallychallenged, castecertificatenumber, incomecertificatenumber, ewsnumber, ricecardnumber, motheradharnumber, bankname, bankifsccode, accountno, student: id });
        await newother.save();

        const newdocument = new Document({ sscmarksheet, intermarksheet, studentadharcard, motheradharcard, castecertificate, rationcard, incomecertificate, motherbankpassbook, studentphoto, student: id });
        await newdocument.save();

        const newgroup = new Group({ secondlanguage, group, student: id });
        await newgroup.save();

        return res.status(201).json({ message: "Registration completed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Error in creating registration, please try again", details: error });
    }
}
export const student_details_verification=async()=>{
    try {
        const {
            studentname, mothername, fathername, dob, gender, adharnumber, interhallticketnumber, intergroup, tenthhallticketnumber,
            houseno, district, street, secretriat, mandal, pincode, village,
            mobilenumber, parentnumber, guardiannumber, email,
            religion, caste, category, physicallychallenged, castecertificatenumber, incomecertificatenumber, ewsnumber, ricecardnumber, motheradharnumber, bankname, bankifsccode, accountno,
            sscmarksheet, intermarksheet, studentadharcard, motheradharcard, castecertificate, rationcard, incomecertificate, motherbankpassbook, studentphoto,
            group, secondlanguage
        } = req.body.formData;
    
        console.log({ studentname, mothername, fathername, dob, gender, adharnumber, interhallticketnumber, intergroup, tenthhallticketnumber });
        console.log("address details:", { houseno, district, street, secretriat, mandal, pincode, village });
        console.log("contact details:", { mobilenumber, parentnumber, guardiannumber, email });
        console.log("other details:", { religion, caste, category, physicallychallenged, castecertificatenumber, incomecertificatenumber, ewsnumber, ricecardnumber, motheradharnumber, bankname, bankifsccode, accountno });
        console.log("documents:", { sscmarksheet, intermarksheet, studentadharcard, motheradharcard, castecertificate, rationcard, incomecertificate, motherbankpassbook, studentphoto });
        const duplicateChecks = [
            { field: 'interhallticketnumber', value: interhallticketnumber, model: Student, message: "Student already exists with this inter hall ticket number" },
            { field: 'tenthhallticketnumber', value: tenthhallticketnumber, model: Student, message: "Student already exists with this tenth hall ticket number" },
            { field: 'adharnumber', value: adharnumber, model: Student, message: "Student already exists with this Aadhar number" },
            { field: 'email', value: email, model: Contact, message: "User already exists with this email" },
            { field: 'castecertificatenumber', value: castecertificatenumber, model: Other, message: "Student already exists with this caste certificate number" },
            { field: 'incomecertificatenumber', value: incomecertificatenumber, model: Other, message: "Student already exists with this income certificate number" },
            { field: 'accountno', value: accountno, model: Other, message: "Student already exists with this account number" },
            { field: 'ewsnumber', value: ewsnumber, model: Other, message: "Student already exists with this EWS number" },
        ];

        for (const check of duplicateChecks) {
            const existingRecord = await check.model.findOne({ [check.field]: check.value });
            if (existingRecord) {
                return res.status(400).json({ error: check.message });
            }
        }
        return res.status(200).json({message:"verification success"});
    } catch (error) {
        return  res.status(404).json({error:"Internal Server error"});
    }
}

export const getstudentdetails=async(req,res)=>{
    const {adharnumber }=req.body;
    try {
        const student=await Student.findOne({adharnumber});
        if(!student){
            return res.status(400).json({error:"Student not found"});
        }
        const id=student._id.toString();
        const ContactDetails=await Contact.findOne({student:id});
        const DocumentDetails=await Document.findOne({student:id});
        const AddressDetails=await Address.findOne({student:id});
        const OtherDetails=await Other.findOne({student:id});
        const GroupDetails=await Group.findOne({student:id})
        return res.status(200).json({student,ContactDetails,DocumentDetails,AddressDetails,OtherDetails,GroupDetails});
    } catch (error) {
        return res.status(400).json({error:"Internal server error"});
    }
}