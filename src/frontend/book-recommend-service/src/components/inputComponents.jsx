import { Mobile, Pc } from "./reponsiveCheck";

export const AuthInput = ({ placeholder, isPassword, onChange }) => {
  return (
    <>
      <Pc>
        {isPassword ? (
          <div className="inputWrapper">
            <input
              className="inputBox"
              type="password"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        ) : (
          <div className="inputWrapper">
            <input
              className="inputBox"
              type="text"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        )}
      </Pc>
      <Mobile>
        {isPassword ? (
          <div className="inputWrapperMobile">
            <input
              className="inputBox"
              type="password"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        ) : (
          <div className="inputWrapperMobile">
            <input
              className="inputBox"
              type="text"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        )}
      </Mobile>
    </>
  );
};
