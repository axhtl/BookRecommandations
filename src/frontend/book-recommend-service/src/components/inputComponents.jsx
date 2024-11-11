import { Mobile, Pc } from "./reponsiveCheck";

export const AuthInput = ({ placeholder, isPassword, onChange, Icon }) => {
  return (
    <>
      <Pc>
        {isPassword ? (
          <div className="inputWrapper">
            <div className="iconWrapper">{Icon}</div>
            {/* <div
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#FFF",
                margin: "0px 16px",
              }}
            /> */}
            <input
              className="inputBox"
              type="password"
              placeholder={placeholder}
              onChange={onChange}
            />
          </div>
        ) : (
          <div className="inputWrapper">
            <div className="iconWrapper">{Icon}</div>
            {/* <div
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "#FFF",
                margin: "0px 16px",
              }}
            /> */}
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
