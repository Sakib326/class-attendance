import React, { Fragment, useState } from "react";
import { useActivateStudentMutation } from "@/appstore/student/api";
import { Modal, Select, Button, Input, message, Spin } from "antd";
const { TextArea } = Input;

export const GenerateImage = (data: any) => {
  return (
    <img
      crossOrigin="anonymous"
      src={
        data?.avatar && data?.avatar !== ""
          ? data?.avatar
          : "/images/misc/avatar-lg.png"
      }
      alt="Featured"
      className="rounded-sm h-12 w-12 object-cover"
    />
  );
};

const RejectionModal = ({ visible, onOk, onCancel }: any) => {
  const [rejectionNote, setRejectionNote] = useState("");

  const handleOk = () => {
    onOk(rejectionNote);
    setRejectionNote("");
  };

  const handleCancel = () => {
    onCancel();
    setRejectionNote("");
  };

  return (
    <Modal
      title="Rejection Note"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <button
          className="btn btn-grey mr-2"
          type="button"
          onClick={handleCancel}
        >
          cancel
        </button>,
        <button className="btn btn-secondary" type="button" onClick={handleOk}>
          Ok
        </button>,
      ]}
    >
      <div className="px-6 py-4">
        <TextArea
          value={rejectionNote}
          onChange={(e) => setRejectionNote(e.target.value)}
          placeholder="Enter rejection note here"
          rows={4}
        />
      </div>
    </Modal>
  );
};

export const ChangeStatus = ({ record }: any) => {
  const [status, setStatus] = useState(record.isVerified);
  const [changeStatus, { isLoading }] = useActivateStudentMutation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleStatus = async (value: string) => {
    setStatus(value);
    if (value == "REJECTED") {
      setModalVisible(true);
    }
  };

  const handleSubmit = async () => {
    await changeStatus({
      idx: record?.idx,
      isVerified: status,
    });
  };

  const handleRejectionOk = async (rejectionNote: any) => {
    console.log("Rejection Note:", rejectionNote);

    await changeStatus({
      idx: record?.idx,
      isVerified: "REJECTED",
      note: rejectionNote,
    })
      .then((resp: any) => {
        console.log("Resolved:", resp);
        message.success("Advisor successfully reject");
      })
      .catch((error: any) => {
        console.log("Rejection Error:", error);
        setStatus(record.isVerified);
      });

    // Close the modal
    setModalVisible(false);
  };

  const handleRejectionCancel = () => {
    setStatus(record.isVerified);
    setModalVisible(false);
  };

  if (record.isVerified == "PENDING") {
    return (
      <Fragment>
        <div className="flex items-center">
          <Select
            defaultValue={record.isVerified}
            style={{ width: 250 }}
            placeholder="Select Category"
            className="min-w-[150px]"
            onChange={handleStatus}
            options={[
              {
                label: "PENDING",
                value: "PENDING",
              },
              {
                label: "REJECTED",
                value: "REJECTED",
              },
              {
                label: "VERIFIED",
                value: "VERIFIED",
              },
              {
                label: "ALIVE",
                value: "ALIVE",
              },
            ]}
            value={status}
          />
          <button
            className="btn btn-secondary ml-1 px-[10px] py-[6px]"
            onClick={handleSubmit}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spin /> : "Update"}
          </button>
        </div>
        <RejectionModal
          visible={modalVisible}
          onOk={handleRejectionOk}
          onCancel={handleRejectionCancel}
        />
      </Fragment>
    );
  }

  if (record.isVerified == "REJECTED") {
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 text-red-700 ring-red-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        REJECTED
      </span>
    );
  }

  if (record.isVerified == "VERIFIED") {
    return (
      <span className="inline-flex items-center rounded-md bg-tail-50 text-green-700 ring-red-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        VERIFIED
      </span>
    );
  }

  if (record.isVerified == "ALIVE") {
    return (
      <span className="inline-flex items-center rounded-md bg-green-50 text-green-700 ring-green-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        ALIVE
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md bg-red-50 text-red-700 ring-red-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
      Deleted
    </span>
  );
};

export const StatusComponent = ({ record }: any) => {
  if (record.isVerified == "REJECTED" && record.deletedAt === null) {
    return (
      <span className="inline-flex items-center rounded-md bg-red-50 text-red-700 ring-red-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        REJECTED
      </span>
    );
  }

  if (record.isVerified == "PENDING" && record.deletedAt === null) {
    return (
      <span className="inline-flex items-center rounded-md bg-tail-50 text-tail-700 ring-tail-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        PENDING
      </span>
    );
  }

  if (record.isVerified == "VERIFIED" && record.deletedAt === null) {
    return (
      <span className="inline-flex items-center rounded-md bg-tail-50 text-green-700 ring-red-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        VERIFIED
      </span>
    );
  }

  if (record.isVerified == "ALIVE" && record.deletedAt === null) {
    return (
      <span className="inline-flex items-center rounded-md bg-green-50 text-green-700 ring-green-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
        ALIVE
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-md bg-red-50 text-red-700 ring-red-600/10 px-2 py-1 text-xs font-medium ring-1 ring-inset">
      Deleted
    </span>
  );
};
