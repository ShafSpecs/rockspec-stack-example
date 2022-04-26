import { Fragment, useEffect, useRef, useState } from "react";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Dialog, Transition } from "@headlessui/react";
import { deleteNote, getNote, updateNote } from "~/models/notes.server";
import { requireUserId } from "~/utils/server/session.server";
import {
  PencilAltIcon,
  TrashIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";

import type {
  LoaderFunction,
  LinksFunction,
  ActionFunction,
} from "@remix-run/node";
import type { Note } from "~/models/notes.server";

import paper from "../../styles/paper.css";
import { Form, useLoaderData } from "@remix-run/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: paper }];
};

type LoaderData = {
  note: Note;
};

type ModalProps = {
  openFunc: (bool: boolean) => void;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ userId, id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ note });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ userId, id: params.noteId });

  return redirect("/notes");
};

export function Modal({ openFunc }: ModalProps) {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => openFunc(false)}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Deactivate account
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => openFunc(false)}
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => openFunc(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function NoteId() {
  const data = useLoaderData() as LoaderData;

  const [open, setOpen] = useState(false);

  return (
    <div className="mt-14 sm:mt-14 md:mt-16 lg:mt-18">
      {open && <Modal openFunc={setOpen}/>}
      <section className="paper h-[29rem] sm:h-[32rem] md:h-[34rem] lg:h-[38rem]">
        <div className="paper-content">
          <textarea
            autoFocus
            draggable={false}
            placeholder="Hello world !&#10;Write notes here and save them for later."
            defaultValue={data.note.body}
          />
        </div>
      </section>
      <section className="relative px-3 sm:px-0 mt-8 sm:mt-10 md:mt-12 lg:mt-14 content-center flex flex-col justify-center max-w-[768px] lg:max-w-[1024px] m-auto">
        <div className="flex flex-row align-middle content-center justify-end w-full">
          <label
            htmlFor="title"
            className="hidden sm:inline-block font-semibold text-xl text-left sm:text-2xl md:text-3xl"
          >
            Title:&nbsp;
          </label>
          <input
            type="text"
            className="rounded-md px-2 my-auto w-full min-w-[290px] max-w-[1024px]"
            name="title"
            id="title"
            placeholder="Give your note a title!"
            defaultValue={data.note.title}
          />
        </div>
        <div className="w-full flex flex-row justify-end align-middle content-center">
          <button
            type="submit"
            className="w-1/3 md:w-1/6  mt-3 max-w-[300px] flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
          >
            <PencilAltIcon className="mr-1 w-5 h-5 md:w-7 md:h-7" />
            Update Note
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-1/3 md:w-1/6  mt-3 ml-1 max-w-[300px] flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
          >
            <TrashIcon className="mr-1 w-5 h-5 md:w-7 md:h-7" />
            Delete Note
          </button>
        </div>
      </section>
    </div>
  );
}
