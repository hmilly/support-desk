import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below:</p>
        <Link to="/new-ticket" className="btn btn-reverse btn-lock">
          <FaQuestionCircle /> Create a new ticket
        </Link>

        <Link to="/tickets" className="btn btn-lock">
          <FaTicketAlt /> View my tickets
        </Link>
      </section>
    </>
  );
};

export default Home;
