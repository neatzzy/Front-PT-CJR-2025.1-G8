"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Protected from "../Protected";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { getCurrentUserAuthorized } from "../../utils/api/apiUser";

function FeedUserHeader() {
  const [user, setUser] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await getCurrentUserAuthorized(token);
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  async function handlerLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  async function handlerPerfilUser() {
    window.location.href = `/usuario/${user ? user.id : null}`;
  }

  const avatarSrc =
    user && user.fotoPerfil
      ? `data:image/png;base64,${user.fotoPerfil}`
      : "/image/fotoPerfil.png";

  return (
    <header className="bg-[#4af0a0] w-full py-2 px-4 flex flex-row flex-wrap justify-between items-center h-[10%]">
      <div className="flex items-center mr-5 h-full w-auto">
        <Image src="/image/UnbLogo.png" alt="LogoUnB" width={60} height={60} />
      </div>

      <Protected singin={false}>
        <a href="/login">
          <button className="bg-[#00ABED] text-white px-5 py-2 border-2 border-white rounded-full cursor-pointer text-[1.2rem] transition-colors duration-300 h-full min-w-[35px] w-fit">
            Login
          </button>
        </a>
      </Protected>

      <Protected singin={true}>
        <div className="flex items-center gap-8">
          <FaBell size={28} className="text-black" />

          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#22a27a] cursor-pointer hover:border-white transition-colors">
            <Image
              src={avatarSrc}
              alt="Avatar"
              width={48}
              height={48}
              onClick={handlerPerfilUser} 
            />
          </div>

          <FaSignOutAlt
            size={28}
            className="text-black cursor-pointer hover:text-white transition-colors"
            onClick={handlerLogout}
          />
        </div>
      </Protected>
    </header>
  );
}

export default FeedUserHeader;
