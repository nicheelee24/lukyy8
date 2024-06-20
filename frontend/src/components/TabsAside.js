import React from "react"
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

export const TabsAside = ({ data }) => {
  return (
    <Tabs value="html" className="tabs-area">
      <div className="px-[52px] py-6 border-4 border-[#5621C0] rounded-full">
        <TabsHeader className="flex gap-5 !bg-transparent">
          {data.map(({ Icon, label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={(e) => {
                let ActiveLi = document.querySelector(".tabs-area ul li.active");
                if (ActiveLi) {
                  ActiveLi.classList.remove("active");
                }

                e.target.classList.add("active");
              }}
            >
              <div className="flex items-center !text-[18px]">
                {Icon && <img src={Icon} alt="" className="mr-3" />}

                <p>{label}</p>
              </div>
            </Tab>
          ))}
        </TabsHeader>
      </div>
    </Tabs>
  );
};
