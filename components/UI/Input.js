import React from "react"

const input = (props) => {
  let inputElement = null
  const inputClasses = [
    "w-full outline-none !border-slate !bg-slate px-2.5 py-1.5 box-border focus:bg-slate"
  ]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("border-red bg-red ") //Invalid [#FDA49A]
  }

  if (props.inline) {
    inputClasses.push("inline-block")
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          style={{
            width: "100%",
            border: "1px solid slate",
            borderRadius: "10px"
          }}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          autoComplete={props.autoC}
        />
      )
      break
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          name={props.name}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          size="100"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
  }

  return (
    <div className="flex flex-row flex-wrap min-[480px]:flex-nowrap box-border ">
      <div className="font-bold m-2 mx-5 text-left text-black min-[480px]:w-[40%] w-full inline-block">
        {props.label}
      </div>
      <div className="text-left text-black w-full min-[480px]:px-2.5 box-border !border-slate  ">
        {inputElement}
      </div>
    </div>
  )
}

export default input
