import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Business Analyst Intern</h4>
                <h5>Tiaro Remote</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Engineered performance data analysis across 10+ campaigns leveraging Python and SQL, catapulting user acquisition by 30%. Architected automated KPI tracking systems, slashing weekly reporting efforts by 40%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE (Data Science)</h4>
                <h5>Manipal University Jaipur</h5>
              </div>
              <h3>2023 - 2027</h3>
            </div>
            <p>
              Advancing a Bachelor of Technology in Computer Science and Engineering with a specialization in Data Science. Championing corporate outreach as Head of Corporate for IEEE WIE MUJ and spearheading events as Lead for MUJ HackX 2.0.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary Education</h4>
                <h5>Dr. Virendra Swaroop Education Centre</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Completed ISC board Higher Secondary Education.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
