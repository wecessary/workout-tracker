import {
  areStringsEqual,
  shouldDisplayEmailWarning,
  shouldDisplayPwWarning,
  validLoginForm,
  validRegForm,
} from "../lib/auth";

describe("Valid Registeration Form", () => {
  it("should return true when all inputs are valid and match", () => {
    const email = "user@example.com";
    const password = "password123";
    const confirmPw = "password123";

    const isValid = validRegForm(email, password, confirmPw);

    expect(isValid).toBe(true);
  });

  it("should return false when any email is empty", () => {
    const email = "";
    const password = "password123";
    const confirmPw = "password123";

    const isValid = validRegForm(email, password, confirmPw);

    expect(isValid).toBe(false);
  });

  it("should return false when email is invalid", () => {
    const email = "not_an_email";
    const password = "password123";
    const confirmPw = "password123";

    const isValid = validRegForm(email, password, confirmPw);

    expect(isValid).toBe(false);
  });

  it("should return false when passwords do not match", () => {
    const email = "user@example.com";
    const password = "password123";
    const confirmPw = "notMatchingPassword";

    const isValid = validRegForm(email, password, confirmPw);

    expect(isValid).toBe(false);
  });
});

describe("validLoginForm", () => {
  it("should ensure that email and password are not empty", () => {
    expect(validLoginForm("", "password")).toBe(false);
    expect(validLoginForm("email@example.com", "")).toBe(false);
    expect(validLoginForm("", "")).toBe(false);
    expect(validLoginForm("email@example.com", "password")).toBe(true);
  });

  it("should ensure that email is valid", () => {
    expect(validLoginForm("email@example", "password")).toBe(false);
    expect(validLoginForm("example.com", "password")).toBe(false);
    expect(validLoginForm("email@example.com", "password")).toBe(true);
  });
});

describe("areStringsEqual", () => {
  it("returns true if all strings are equal", () => {
    expect(areStringsEqual("hello", "hello", "hello", "hello")).toBe(true);
  });

  it("returns false if any string is empty", () => {
    expect(areStringsEqual("", "hello")).toBe(false);
  });

  it("returns false if any string is different", () => {
    expect(areStringsEqual("hello", "world")).toBe(false);
  });
});


describe("shouldDisplayPwWarning", () => {
  test("should return true when passwords do not match", () => {
    const password = "password";
    const confirmPw = "wrong password";
    const shouldDisplayWarning = shouldDisplayPwWarning(password, confirmPw);
    expect(shouldDisplayWarning).toBe(true);
  });

  test("should return false when passwords match", () => {
    const password = "password";
    const confirmPw = "password";
    const shouldDisplayWarning = shouldDisplayPwWarning(password, confirmPw);
    expect(shouldDisplayWarning).toBe(false);
  });

  test("should return false when either password or confirmPw is empty", () => {
    const password = "";
    const confirmPw = "password";
    const shouldDisplayWarning1 = shouldDisplayPwWarning(password, confirmPw);
    expect(shouldDisplayWarning1).toBe(false);

    const password2 = "password";
    const confirmPw2 = "";
    const shouldDisplayWarning2 = shouldDisplayPwWarning(password2, confirmPw2);
    expect(shouldDisplayWarning2).toBe(false);

    const password3 = "";
    const confirmPw3 = "";
    const shouldDisplayWarning3 = shouldDisplayPwWarning(password3, confirmPw3);
    expect(shouldDisplayWarning3).toBe(false);
  });
});

describe('shouldDisplayEmailWarning', () => {
    it('should return true when email is invalid and length is greater than 4', () => {
      expect(shouldDisplayEmailWarning('john.doe')).toBe(true);
    });
  
    it('should return false when email is invalid and length is less than or equal to 4', () => {
      expect(shouldDisplayEmailWarning('jdoe')).toBe(false);
    });
  
    it('should return false when email is valid', () => {
      expect(shouldDisplayEmailWarning('johndoe@gmail.com')).toBe(false);
    });
  });