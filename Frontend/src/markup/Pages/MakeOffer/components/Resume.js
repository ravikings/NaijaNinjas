import React from "react";
import Loader from "../../../Element/Loader";
import {
  Headline,
  Skills,
  Employment,
  Education,
  ItSkills,
  Projects,
  ProfileSummary,
  CareerProfile,
  PersonalDetails,
} from "./ResumeComponents";

function Resume({ data }) {
  console.log(data, "ALWAYS");

  return (
    <>
      {!data ? (
        <></>
      ) : (
        <div>
          {/* Headline Section Start */}

          <Headline
            headline={data.headline}
            isLoggedIn={false}
            user={{ id: 1 }}
            owner={{ id: 6 }}
          />

          {/* Headline Section Ends */}

          {/* Key Skills Start */}

          <Skills isLoggedIn={false} user={{ id: 1 }} owner={{ id: 6 }} />

          {/* Key Skills Ends */}

          {/* Employment Start */}
          <Employment isLoggedIn={true} user={{ id: 1 }} owner={{ id: 1 }} />

          {/* Employment Ends */}

          {/* Education Start */}
          {data.education && (
            <Education isLoggedIn={true} user={{ id: 1 }} owner={{ id: 1 }} />
          )}

          {/* Education Ends */}

          {/* It Skills Start */}

          <ItSkills isLoggedIn={true} user={{ id: 1 }} owner={{ id: 1 }} />

          {/* It Skills Ends */}

          {/* Projects Start */}
          {data.projects !== "FALSE" && <Projects />}
          {/* Projects End */}

          {/* Projects Start */}
          {data.profile_summary && (
            <ProfileSummary summary={data.profile_summary} />
          )}
          {/* Projects End */}

          {/* Career Profile Start */}
          <CareerProfile isLoggedIn={true} user={{ id: 1 }} owner={{ id: 1 }} />
          {/* Career Profile End */}

          {/* Personal Details Start */}
          <PersonalDetails
            isLoggedIn={true}
            user={{ id: 1 }}
            owner={{ id: 1 }}
          />
          {/* Career Profile End */}
        </div>
      )}
    </>
  );
}

export default Resume;
