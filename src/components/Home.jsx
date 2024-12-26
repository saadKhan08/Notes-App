import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import './Home.css';


const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); 
  // Destructure useSearchParams
  const pasteId = searchParams.get("pasteId"); 
  // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {

      // If pasteId is present, update the paste

      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");

    // Remove the pasteId from the URL after creating/updating a paste

    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);


  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 ">
      <div  className="flex flex-col gap-y-5 items-start w-[70%] min-w-[340px] mx-auto">
        <div className="main-title">
          <h3>Let&lsquo;s create Notes 🎉</h3>
        </div>
  
        <div id="input-note" className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // Dynamic width based on whether NotesId is present
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border-4 border-[rgba(128,121,121,0.3)] border-input rounded-md p-2`}
          />
              <div className="background">
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   </div>
          <button id="btn-create-note"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm font-semibold px-5 py-2 me-2 mb-0.9 dark:bg-blue-600 dark:hover:bg-blue-700 h-[50px]"
            onClick={createPaste}
          >
            {pasteId ? "Update" : "Save"}
          </button>

        {pasteId &&  <button 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 ml-[-9px]  dark:bg-blue-600 dark:hover:bg-blue-700 "
            onClick={resetPaste}
          >
            <PlusCircle size={20} className="" />
          </button>}
        </div>

        <div id="main-notes"
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border-4 border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)] bg-white`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4 `}
            >
              {/*Copy  button */}
              <button
                className={`flex  justify-center items-center  transition-all duration-300 ease-in-out group `}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500 " size={20} />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3 border-t-2 border-[rgba(128,121,121,0.3)]   focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={19}
          />
        </div>
      </div>
      <div className="flex justify-center align-center font-semibold text-xl bottom-5  ">
        Created by ❤️ Mohammad Saad
      </div>
    </div>
  );
};

export default Home;
