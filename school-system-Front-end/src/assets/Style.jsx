function Style (){

return (

    <style
  dangerouslySetInnerHTML={{
    __html:
      "\n        .navbar {\n            position: fixed;\n            top: 0;\n            width: 100%;\n            z-index: 1030;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        }\n\n        body {\n            padding-top: 59px;\n        }\n\n        /* Custom Colors */\n        .bg-primary-custom {\n            background-color: #0056b3;\n            /* Custom Blue */\n        }\n\n        .text-primary-custom {\n            color: #0056b3;\n            /* Custom Blue for Text */\n        }\n\n        .btn-custom {\n            background-color: #cc5800;\n            /* Darker Orange for better contrast */\n            color: white;\n        }\n\n        .btn-custom:hover {\n            background-color: #b94e00;\n            /* Darker Orange on Hover */\n        }\n        p.card-title {\n  font-weight: bold;\n}\n\n    "
  }}
/>


)


}


export default Style