import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function RoomPage() {
    const { roomId } = useParams();
    const { user } = useSelector((state) => state.user);
    const myMeeting = async (element) => {
        const appId = 315547515;
        const serverSecret = "6ec13d943a3dfc5aef84671f20594c8a";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, user._id, user.name);
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [{
                name: 'Copy Link',
                url: `http://localhost:3000/room/${roomId}`,
            },

            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
        });
    }
    return (
        <div>
            <div ref={myMeeting}></div>
        </div>
    );


}

export default RoomPage;