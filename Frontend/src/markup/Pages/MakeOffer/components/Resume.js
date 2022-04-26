import React, { useState } from "react";
import { Headline, Skills,Employment,Education,ItSkills,Projects,ProfileSummary,CareerProfile,PersonalDetails } from "./../../components";

function Resume(props) {
  const [resume, setResume] = useState(false);
  const [keyskill, setKeyskill] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [education, setEducation] = useState(false);
  const [itskills, setItSkills] = useState(false);
  const [projects, setProjects] = useState(false);
  const [profilesummary, setProfileSummary] = useState(false);
  const [careerprofile, setCareerProfile] = useState(false);
  const [personaldetails, setPersonalDetails] = useState(false);

  return (
    <div>
      {/* Headline Section Start */}

      <Headline
        headline={"Job board currently living in USA"}
        {...{ setResume, resume }}
        isLoggedIn={false}
        user={{ id: 1 }}
        owner={{ id: 6 }}
      />

      {/* Headline Section Ends */}

      {/* Key Skills Start */}

      <Skills
        {...{ setKeyskill, keyskill }}
        isLoggedIn={false}
        user={{ id: 1 }}
        owner={{ id: 6 }}
      />

      {/* Key Skills Ends */}

      {/* Employment Start */}
      <Employment
        {...{ setEmployment, employment }}
        isLoggedIn={true}
        user={{ id: 1 }}
        owner={{ id: 1 }}
      />

      {/* Employment Ends */}



    {/* Education Start */}
      <Education
    {...{ setEducation, education }}
    isLoggedIn={true}
    user={{ id: 1 }}
    owner={{ id: 1 }}
  />

  {/* Education Ends */}

   {/* It Skills Start */}

   <ItSkills
    {...{ setItSkills, itskills }}
    isLoggedIn={true}
    user={{ id: 1 }}
    owner={{ id: 1 }}
  />


    {/* It Skills Ends */}

     {/* Projects Start */}
     <Projects
          {...{ setProjects, projects }}
          isLoggedIn={true}
          user={{ id: 1 }}
          owner={{ id: 1 }}
        />
        {/* Projects End */}

         {/* Projects Start */}
         <ProfileSummary
                    {...{ setProfileSummary, profilesummary }}
                    isLoggedIn={true}
                    user={{ id: 1 }}
                    owner={{ id: 1 }}
                  />
                  {/* Projects End */}
               
                 {/* Career Profile Start */}
                 <CareerProfile
                    {...{ setCareerProfile, careerprofile }}
                    isLoggedIn={true}
                    user={{ id: 1 }}
                    owner={{ id: 1 }}
                  />
                  {/* Career Profile End */}
                

                 {/* Personal Details Start */}
                 <PersonalDetails
                    {...{ setPersonalDetails, personaldetails }}
                    isLoggedIn={true}
                    user={{ id: 1 }}
                    owner={{ id: 1 }}
                  />
                  {/* Career Profile End */}

    </div>
  );
}

export default Resume;
