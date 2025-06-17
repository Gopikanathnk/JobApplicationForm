import React, { useState } from "react";
import "./JobApplicationForm.css";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    portfolio: "",
    experience: "",
    skills: [],
    coverLetter: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const skillOptions = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"];
  const positionOptions = ["Frontend Developer", "Backend Developer", "Full Stack Developer"];

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    else if (formData.fullName.trim().length < 3) newErrors.fullName = "Minimum 3 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email.";

    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required.";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Must be 10 digits.";

    if (!formData.position) newErrors.position = "Position is required.";

    if (formData.portfolio && !/^https?:\/\/.+\..+/.test(formData.portfolio)) {
      newErrors.portfolio = "Invalid URL.";
    }

    if (!formData.experience) newErrors.experience = "Experience is required.";

    if (formData.skills.length < 2) newErrors.skills = "Select at least 2 skills.";

    if (formData.coverLetter.length > 300)
      newErrors.coverLetter = "Max 300 characters.";

    if (!formData.terms) newErrors.terms = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "skills") {
      const updatedSkills = checked
        ? [...formData.skills, value]
        : formData.skills.filter((skill) => skill !== value);
      setFormData({ ...formData, skills: updatedSkills });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", JSON.stringify(formData, null, 2));
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        portfolio: "",
        experience: "",
        skills: [],
        coverLetter: "",
        terms: false,
      });
      setErrors({});
    } else {
      setSubmitted(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      portfolio: "",
      experience: "",
      skills: [],
      coverLetter: "",
      terms: false,
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <h2>Job Application Form</h2>

        {/* Full Name */}
        <label>
          Full Name <span style={{ color: "red" }}>*required</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          style={{ borderColor: errors.fullName ? "red" : "" }}
        />
        {errors.fullName && <p className="error-message">{errors.fullName}</p>}

        {/* Email */}
        <label>
          Email <span style={{ color: "red" }}>*required</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ borderColor: errors.email ? "red" : "" }}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        {/* Phone */}
        <label>
          Phone Number <span style={{ color: "red" }}>*required</span>
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ borderColor: errors.phone ? "red" : "" }}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        {/* Position */}
        <label>
          Position Applied For <span style={{ color: "red" }}>*required</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          style={{ borderColor: errors.position ? "red" : "" }}
        >
          <option value="">--Select--</option>
          {positionOptions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
        {errors.position && <p className="error-message">{errors.position}</p>}

        {/* Portfolio */}
        <label>Portfolio URL</label>
        <input
          type="url"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          style={{ borderColor: errors.portfolio ? "red" : "" }}
        />
        {errors.portfolio && <p className="error-message">{errors.portfolio}</p>}

        {/* Experience */}
        <label>
          Experience <span style={{ color: "red" }}>*required</span>
        </label>
        {["Fresher", "1-3 years", "3+ years"].map((exp) => (
          <label key={exp} style={{ display: "block" }}>
            <input
              type="radio"
              name="experience"
              value={exp}
              checked={formData.experience === exp}
              onChange={handleChange}
            />
            {exp}
          </label>
        ))}
        {errors.experience && <p className="error-message">{errors.experience}</p>}

        {/* Skills */}
        <label>
          Skills <span style={{ color: "red" }}>*required (min 2)</span>
        </label>
        {skillOptions.map((skill) => (
          <label key={skill} style={{ display: "block" }}>
            <input
              type="checkbox"
              name="skills"
              value={skill}
              checked={formData.skills.includes(skill)}
              onChange={handleChange}
            />
            {skill}
          </label>
        ))}
        {errors.skills && <p className="error-message">{errors.skills}</p>}

        {/* Cover Letter */}
        <label>Cover Letter (max 300 chars)</label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          maxLength={300}
          rows={5}
        />
        <p>{formData.coverLetter.length}/300 characters</p>
        {errors.coverLetter && <p className="error-message">{errors.coverLetter}</p>}

        {/* Terms */}
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          I accept the terms & conditions <span style={{ color: "red" }}>*required</span>
        </label>
        {errors.terms && <p className="error-message">{errors.terms}</p>}

        {/* Buttons */}
        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>

        {submitted && <p className="success-message">Form submitted successfully!</p>}
      </form>
    </div>
  );
};

export default JobApplicationForm;
