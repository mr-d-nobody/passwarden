import React, { useEffect, useRef, useState } from "react";

const Manager = () => {
  const imgRef = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) setPasswordArray(JSON.parse(passwords));
  }, []);

  const showPassword = () => {
    if (imgRef.current.src.includes("/e.png")) {
      imgRef.current.src = "/icons.png";
      passwordRef.current.type = "text";
    } else {
      imgRef.current.src = "/e.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    const { site, username, password } = form;
    if (!site.trim() || !username.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    let updated;
    if (editIndex !== null) {
      updated = [...passwordArray];
      updated[editIndex] = form;
    } else {
      updated = [...passwordArray, form];
    }

    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setEditIndex(null);
    setForm({ site: "", username: "", password: "" });
  };

  const handleEdit = (index) => {
    setForm(passwordArray[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
    setEditIndex(null);
    setForm({ site: "", username: "", password: "" });
  };

  return (
    
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      {/* Heading & Form */}
      <div className="text-center mt-4 mb-4">
        <h1 className="text-2xl font-bold">PassWarden</h1>
        <p className="text-gray-400 text-sm">Your own Password Manager</p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-4 px-4">
        <input
          type="text"
          name="site"
          value={form.site}
          onChange={(e) => setForm({ ...form, site: e.target.value })}
          placeholder="Enter Website URL"
          className="w-full md:w-2/3 rounded-full bg-neutral-800 border border-gray-600 text-white px-4 py-2"
        />
        <div className="flex w-full md:w-2/3 gap-2">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Enter Username"
            className="w-1/2 rounded-full bg-neutral-800 border border-gray-600 text-white px-4 py-2"
          />
          <div className="relative w-1/2">
            <input
              ref={passwordRef}
              type="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter Password"
              className="w-full rounded-full bg-neutral-800 border border-gray-600 text-white px-4 py-2 pr-10"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer"
              onClick={showPassword}
            >
              <img ref={imgRef} src="/icons.png" alt="toggle" width={24} />
            </span>
          </div>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-white text-sm"
          onClick={savePassword}
        >
          {editIndex !== null ? "Update Password" : "Add Password"}
        </button>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <h2 className="text-xl font-semibold mb-2">Your Saved Passwords</h2>
        <table className="w-full bg-neutral-800 rounded-md text-white overflow-hidden">
          <thead className="bg-neutral-700">
            <tr>
              <th className="text-left px-4 py-2">Website</th>
              <th className="text-left px-4 py-2">Username</th>
              <th className="text-left px-4 py-2">Password</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.length > 0 ? (
              passwordArray.map((item, index) => (
                <tr key={index} className="border-t border-neutral-700 hover:bg-neutral-700">
                  <td className="px-4 py-2">
                    <a href={item.site} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                      {item.site}
                    </a>
                  </td>
                  <td className="px-4 py-2">{item.username}</td>
                  <td className="px-4 py-2">{item.password}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(index)} className="text-blue-400 hover:underline text-sm">Edit</button>
                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline text-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">No passwords saved yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
