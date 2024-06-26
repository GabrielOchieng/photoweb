import React from "react";

const items = [
  {
    title: "SHARE AND VIEW  ONLINE PHOTOS WITH PHOTOWEB        ",
    description:
      "Welcome to MyAlbum, the ultimate destination for capturing and sharing your best memories. With our innovative and easy-to-use tools, you can easily share your online photo album, create a beautiful online photo book, and effortlessly share it online with friends and family. Discover the benefits of MyAlbum and make your photos shine.",
  },
  {
    title: "EASY VIEWING",
    description:
      "With Photoweb, viewing your memories has never been easier. View photos,  texts and layouts, and view online photo book instantly with a unique link. Whether you want to view your last vacation, a special occasion, or a collection of best moments, Photoweb puts it all at your fingertips.    ",
  },
  {
    title: "PROFESSIONAL LAYOUTS",
    description:
      "Our advanced yet easy-to-use design capabilities allow you to view beautiful, professional photo books. Choose from a variety of templates and layouts to make  photos stand out. This way, you can view an impressive online photo book that you can proudly display in no time.    ",
  },
  {
    title: "UNLIMITED STORAGE    ",
    description:
      "With Photoweb, you get unlimited storage space for free to store all your memories safely. Whether you have a few photos or thousands, you can organize and view them all without worrying about storage limits. Your memories are always accessible, no matter where you are.    ",
  },
  {
    title: "SAFETY FIRST",
    description:
      "We understand how important privacy is. That's why we make sure albums are safe and only visible to the people who are authenticated. With Photoweb, you have complete control over who can view and share photo books.",
  },
  {
    title: "VERSATILE POSSIBILITIES",
    description:
      "Whether you're looking to view a photo book for a special occasion, share a digital photo album with family, or showcase a professional portfolio, Photoweb offers the versatility and flexibility you need. Our tools are designed to meet your every need, so you can always view and share the perfect online photo album.",
  },
  {
    title: "GET STARTED TODAY",
    description:
      "Get started with Photoweb today and experience how easy it is to view and share an online photo book. View, share and enjoy best moments on your PC but also with the Photoweb iPhone and Android app. With Photoweb, your memories are always at your fingertips, ready to be shared and relived.",
  },
];

const Features = () => {
  return (
    <div className="bg-slate-200 pb-10 md:pb-20 mt-1 md:mt-5">
      <div className="bg-teal-200 w-[90%] mx-auto rounded-md p-5 md:p-10 flex flex-col gap-2 ">
        <div>
          <h1 className="font-bold text-center text-gray-700 text-xl underline uppercase">
            Features
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h1 className="font-medium md:font-bold text-teal-700">
                {item.title}
              </h1>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
