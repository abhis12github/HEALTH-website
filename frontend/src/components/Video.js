import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

function Video() {
    const [value, setValue] = useState();
    const navigate = useNavigate();
    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`);
    }, [navigate, value]);
    return (
        <div className="m-4 p-2">
            <input className="p-2 outline-[1px] outline-gray-600 mr-4" value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter Room Code"></input>
            <button onClick={handleJoinRoom} className="p-2 bg-blue-400 rounded-md">Join Video</button>
        </div>

    )

};

export default Video;