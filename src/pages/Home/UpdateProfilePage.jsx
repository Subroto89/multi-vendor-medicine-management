import Container from "../../components/shared/Container";
import { FaLock, FaUserEdit } from "react-icons/fa";
import { TabTitle } from "../../utilities/utilities";
import PersonalInfoUpdateForm from "../../components/forms/PersonalInfoUpdateForm";
import AddressUpdateForm from "../../components/forms/AddressUpdateForm";
import PasswordUpdateForm from "../../components/forms/PasswordUpdateForm";

const UpdateProfilePage = () => {
  TabTitle("Update Profile");

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl text-gray-600">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8 flex items-center justify-center gap-3">
            <FaUserEdit className="text-blue-500" /> Update Your Profile
          </h2>
          {/* Personal Information Form ------------------------------------------------------------------------------*/}
          <section className="mb-10">
            <PersonalInfoUpdateForm />
          </section>

          {/* Shipping Address Section (Placeholder - you'd create this component) -----------------------------------*/}
          <section className="mb-10">
            <AddressUpdateForm />
          </section>

          {/* Password Change Section (Placeholder - you'd create this component)  -----------------------------------*/}
          <section>
            <PasswordUpdateForm />
          </section>
        </div>
      </Container>
    </div>
  );
};

export default UpdateProfilePage;
