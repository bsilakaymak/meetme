"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const authReducer_1 = __importDefault(require("./authReducer"));
const authContext_1 = __importDefault(require("./authContext"));
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const AuthState = (props) => {
    const initialState = {
        user: null,
        isAuthenticated: false,
        loading: false,
        token: localStorage.getItem("token"),
        error: null,
    };
    const [state, dispatch] = react_1.useReducer(authReducer_1.default, initialState);
    const login = (authForm) => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            headers: {
                "Type-content": "application/json",
            },
        };
        const data = yield axios_1.default.post("http://localhost:5000/api/auth/signup", config, authForm);
        dispatch({
            type: types_1.LOGIN_SUCCESS,
            payload: data.data,
        });
        try {
        }
        catch (error) {
            dispatch({
                type: types_1.LOGIN_FAIL,
                payload: error.response.data.errors,
            });
        }
    });
    const register = (FormData) => __awaiter(void 0, void 0, void 0, function* () {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = yield axios_1.default.post("/api/users", FormData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            loadUser();
        }
        catch (error) {
            dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
        }
    });
    return (<authContext_1.default.Provider value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        login,
        register,
    }}>
      {props.children}
    </authContext_1.default.Provider>);
};
exports.default = AuthState;
