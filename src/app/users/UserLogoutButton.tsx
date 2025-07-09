"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import LogoutModal from "./LogoutModal";

const ModalContainer = ({ children }: { children: React.JSX.Element }) => {
  const container = document.getElementById("container");
  if (!container) {
    return null;
  }
  return createPortal(children, container);
};

const UserLogoutButton = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setLogoutModalOpen(true)}
        className="relative my-auto ml-auto mr-2 shrink-0 rounded-3xl bg-orange-400 px-3 py-2 text-xs font-semibold text-white"
      >
        ログアウト
      </button>
      <div id="container">
        {logoutModalOpen && (
          <ModalContainer>
            <LogoutModal
              modalClose={() => {
                setLogoutModalOpen(false);
              }}
            />
          </ModalContainer>
        )}
      </div>
    </>
  );
};

export default UserLogoutButton;
