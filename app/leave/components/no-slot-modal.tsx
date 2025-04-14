"use client";

import { Leave } from "@/app/lib/types";
import { Button, Modal, ModalBody, ModalHeader, List, ListItem } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function NoSlotModal({ openModal, handleModal, takenDates }: {openModal: boolean, handleModal: Function, takenDates: Leave[]}) {


  return (
    <>
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" onClose={() => handleModal()} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Dates selected are taken: 
              <List>
                {takenDates.map(x => (
                    <>
                      <ListItem>{ x.from } - { x.to} </ListItem>
                    </>
                ))
                }
              </List>
            </h3>
            <div className="flex justify-center gap-4">
              {/* <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button> */}
              {/* <Button color="gray" onClick={() => setOpenModal(false)}>
                Note
              </Button> */}
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}