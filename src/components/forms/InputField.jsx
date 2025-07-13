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
  rows = 3,
  options = [],
}) => {
  const isTextArea = type === "textarea";
  const isSelect = type === "select";
  // ###########################################################################################
  return (
    <div>
      {/* ---------------------------------------------------------------------------
        Label of a Input Element
        ---------------------------------------------------------------------------- */}
      <label htmlFor={name} className="block text-sm font-medium">
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

        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            rows={rows}
            {...register(name, validationRules)}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${errors[name] ? "border-red-500" : "border-gray-300"}
          `}
          ></textarea>
        ) : isSelect ? (
          <select
            id={name}
            name={name}
            {...register(name, validationRules)}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
            ${errors[name] ? "border-red-500" : "border-gray-300"}
          `}
          >
            {/* Default option for select, often "Select a..." */}
            <option value="">
              {placeholder || `Select a ${label.toLowerCase()}`}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
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
        )}
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
