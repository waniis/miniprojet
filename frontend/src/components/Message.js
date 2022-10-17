import React from "react";

const Message = ({ className, children }) => {
   return (
    <div className={className} role="alert">
{children}
</div>
)
};

Message.defaultProps = { className: "p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" };

export default Message;
