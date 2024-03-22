import React, { useState } from 'react'
import { TECollapse } from 'tw-elements-react'
import Select from 'react-select'
import ImgComponent from '../Home/ImgComponent'
import DropDown from '../orders/dropDown'

function Notice() {
  const [show, setShow] = useState({
    collapse1: false,
    collapse2: false,
    collapse3: false,
  })

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [notice, setNotice] = useState()
  const [fileId,setFileId] = useState()

  const toggleShow = (value) => {
    setShow({ ...show, ...value })
  }

  const options = [
    {
      value: 'customer',
      label: 'Customer',
    },
    {
      value: 'vendor',
      label: 'Vendor',
    },
  ]

  const handleOptionChange = (selectedOption) => {
    setNotice(selectedOption.value)
  }

  const handleFileUpload = (fileId) => {
    setFileId(fileId)
  }
  

  return (
    <>
      <div className="bg-white w-full rounded p-4">
        <h1 className="font-semibold text-lg">Notice</h1>
      </div>
      <div className="flex mt-4 border border-white bg-slate-200 rounded px-32  flex-col lg:flex-col lg:justify-around">
        <div className="flex mt-4 flex-col lg:flex-row lg:justify-between">
          <div className="mb-3 lg:mr-3">
            <label className="block">
              <span className="block">
                Title<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
              type="text"
            />
          </div>
          <div>
            <label className="block">
              <span className="block">
                Description<span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-blue-400"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div className="flex mt-4 flex-col mb-4 lg:flex-row lg:justify-between">
          <div className="mb-3 lg:mr-3 ">
            <label className="block">
              <span className="block">
                Upload Image <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="bg-white rounded w-96">
              <ImgComponent onFileUpload={(fileId) => handleFileUpload(fileId)} name="image2" />
            </div>
          </div>
          <div>
            <div className="w-80 mb-3">
              <label className="block">
                <span className="block">
                  Send To <span className="text-red-500">*</span>
                </span>
              </label>
              <Select
                value={options.find((option) => option.value === notice)}
                onChange={handleOptionChange}
                options={options}
                isSearchable
                placeholder="Search..."
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'white',
                    color: 'black',
                  }),
                  control: (provided, state) => ({
                    ...provided,
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                  }),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notice

{
  /* <div id="accordionExample">
        <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0" id="headingOne">
            <button
              className={`${
                show.collapse1 &&
                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
              } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
              type="button"
              onClick={() => toggleShow({ ...show, collapse1: !show.collapse1 })}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
              <span
                className={`${
                  show.collapse1
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 fill-[#212529]  dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse show={show.collapse1} className="!mt-0 !rounded-b-none !shadow-none">
            <div className="px-5 py-4">
              <strong>This is the first item is accordion body.</strong> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Vestibulum eu rhoncus purus, vitae tincidunt nibh.
              Vivamus elementum egestas ligula in varius. Proin ac erat pretium, ultricies leo at,
              cursus ante. Pellentesque at odio euismod, mattis urna ac, accumsan metus. Nam nisi
              leo, malesuada vitae pretium et, laoreet at lorem. Curabitur non sollicitudin neque.
            </div>
          </TECollapse>
        </div>
      </div>
      <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="mb-0" id="headingTwo">
          <button
            className={`${
              show.collapse2
                ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                : `transition-none rounded-b-[15px]`
            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => toggleShow({ ...show, collapse2: !show.collapse2 })}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Accordion Item #2
            <span
              className={`${
                show.collapse2
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse show={show.collapse2} className="!mt-0 !rounded-b-none !shadow-none">
          <div className="px-5 py-4">
            <strong>This is the second item is accordion body.</strong> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Vestibulum eu rhoncus purus, vitae tincidunt nibh. Vivamus
            elementum egestas ligula in varius. Proin ac erat pretium, ultricies leo at, cursus
            ante. Pellentesque at odio euismod, mattis urna ac, accumsan metus. Nam nisi leo,
            malesuada vitae pretium et, laoreet at lorem. Curabitur non sollicitudin neque.
          </div>
        </TECollapse>
      </div>
      <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="accordion-header mb-0" id="headingThree">
          <button
            className={`${
              show.collapse3
                ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                : `transition-none rounded-b-[15px]`
            } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => toggleShow({ ...show, collapse3: !show.collapse3 })}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Accordion Item #3
            <span
              className={`${
                show.collapse3
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <TECollapse show={show.collapse3} className="!mt-0 !shadow-none">
          <div className="px-5 py-4">
            <strong>This is the third item is accordion body.</strong> Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Vestibulum eu rhoncus purus, vitae tincidunt nibh. Vivamus
            elementum egestas ligula in varius. Proin ac erat pretium, ultricies leo at, cursus
            ante. Pellentesque at odio euismod, mattis urna ac, accumsan metus. Nam nisi leo,
            malesuada vitae pretium et, laoreet at lorem. Curabitur non sollicitudin neque.
          </div>
        </TECollapse>
      </div> */
}
