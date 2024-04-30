import React from 'react'
import { handleFollow} from "../fragments/helper.js";
import { useDispatch, useSelector } from "react-redux";

const FollowButton = ({post,channel,handleNotification}) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
     {currentUser?._id !== post?.userId && (
              <>
                {currentUser?.subscribedUsers?.includes(channel?._id) ? (
                  " "
                ) : (
                  <>
                    {currentUser && (
                      <div
                        className="items-center justify-center absolute right-4 rounded-sm flex flex-row text-md px-4 text-white bg-[#00acee] font-medium"
                        onClick={() =>
                          handleFollow({
                            userId: post.userId,
                            channelId: channel?._id,
                            handleNotification,
                            dispatch,
                          })
                        }
                      >
                        follow
                      </div>
                    )}
                  </>
                )}
              </>
            )}
    </>
  )
}

export default FollowButton