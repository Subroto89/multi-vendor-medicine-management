// ---------------------------------------------------------------------------
// Input Field Component - Used In the RegisterForm Component  ***************
// The Below Parameters Are Passed When This Component Is Invoked.
// ---------------------------------------------------------------------------
const InputField = ({
  name,
  label,
  icon: Icon,
  type,
  placeholder,
  validationRules,
  register,
  errors,
}) => {
  // ###########################################################################################
  return (
    <div>
      {/* ---------------------------------------------------------------------------
        Label of a Input Element
        ---------------------------------------------------------------------------- */}
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>

      {/* ------------------------------------------------------------------------------
      Relative div Container - Contains Icon & Input Element. Icons placed relatively
      ------------------------------------------------------------------------------ */}
      <div className="relative">
        {/* Icon Section------------------------------------------------------------- */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Icon />
          </div>
        )}
        {/* Input Element Section-------------------------------------------------- */}
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`border border-gray-300 rounded-lg ${
            Icon ? "pl-10" : "pl-4"
          } p-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
          {...register(name, validationRules)}
        />
      </div>
      {/* ----------------------------------------------------------------------------
      Display Error Message  
      ------------------------------------------------------------------------------*/}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputField;
