import React from "react";
import { useTranslation } from "react-i18next";

export const RegisterBanner = () => {
  const { t } = useTranslation()

  return (
    <div className="RegisterBanner h-64 px-6 py-9 rounded-xl">
      <h1>
        <span>{t("Register")}</span>{t(" now to instantly redeem a ")}<span>300%</span>
        {t("deposit your bonus!")}
      </h1>
      <p className="mt-3.5 mb-7">{t("Deposit bonus up to $20,000.")}</p>
      <a
        href="/"
        className="h-11 w-28 flex items-center justify-center rounded-lg"
      >
        {t("Sign Up")}
      </a>
    </div>
  );
};
