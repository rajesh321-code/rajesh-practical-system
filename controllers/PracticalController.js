import PracticalModel from '../models/Practical.js';
import SubjectModel from '../models/Subject.js';

export const createPractical = async (req, res) => {
  try {
    const { Subject: subjectName, email, Practical } = req.body;

    // Find subject by name
    const Subjectinfo = await SubjectModel.findOne({ name: subjectName });

    if (!Subjectinfo) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create a new Practical object
    const PracticalObj = new PracticalModel({
      Subject: Subjectinfo._id, // Use _id, not id
      email,
      Practical,
    });

    // Save the Practical document
    const savedPractical = await PracticalObj.save();

    // Update the Subject to include the new Practical
    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      Subjectinfo._id,
      { $push: { practicals: savedPractical._id } }, // Update correct field name
      { new: true }
    )
      .populate("practicals") // Populate the correct field
      .exec();

    res.json({ Subject: updatedSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while adding Practical" });
  }
};

export const getAllPractical = async (req, res) => {
  try {
    const practicals = await PracticalModel.find(); // Corrected variable name
    res.json({ practicals });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error while fetching practicals" });
  }
};