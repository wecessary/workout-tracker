/**
 * @jest-environment jsdom
 */

import { User } from "firebase/auth";
import { unProtectedLogic } from "./UnprotectedRoutes";

describe("Unprotected routes", () => {
  const RedirectRoute = () => {
    return <div>Logged in users should see me</div>;
  };

  const UnprotectedRoute = () => {
    return <div>Logged in users should not see me</div>;
  };

  test("logged in user should not see unprotectedRoute", () => {
    const outcome = unProtectedLogic(
      {} as User,
      false,
      <RedirectRoute />,
      <UnprotectedRoute />
    );
    expect(outcome).not.toEqual(<UnprotectedRoute />);
    expect(outcome).toEqual(<RedirectRoute />);
  });

  test("unlogged in user should see unprotectedRoute", () => {
    const outcome = unProtectedLogic(
      null,
      false,
      <RedirectRoute />,
      <UnprotectedRoute />
    );

    expect(outcome).toEqual(<UnprotectedRoute />);
  });
});
