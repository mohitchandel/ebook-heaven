"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Skeleton,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { trpc } from "../_trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { userId } = useContext(UserContext);
  const { data: userData, isFetched } = trpc.getUserById.useQuery(userId, {
    enabled: !!userId,
  });
  const { data: userPost } = trpc.getEbooksByAuthorId.useQuery(userId, {
    enabled: !!userId,
  });
  const [name, setName] = useState<string>(userData?.name || "");
  const updateUserProfile = trpc.updateUserProfile.useMutation();

  /* This function is updating the user's profile information using
  `updateUserProfile.mutate()`
  */
  const updateProfile = async () => {
    try {
      updateUserProfile.mutate({ userId, name });
      toast.success("Profile Updated");
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error("An error occurred while updating your profile.");
    }
  };

  useEffect(() => {
    if (!userData) {
      router.replace("/login");
    }
  }, [userId, userData, router]);

  return (
    <>
      <main className="flex h-[87vh] flex-col items-center justify-between p-24">
        <div className="my-20 mx-auto p-4 w-[400px] bg-white flex gap-8 h-max">
          <Card className="w-full max-w-3xl">
            <CardBody className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-center mx-auto">
                  <div className="flex items-center">
                    <div className="mx-auto">
                      <UserIcon />
                    </div>
                  </div>
                  <Skeleton isLoaded={isFetched}>
                    <h1 className="text-2xl font-bold py-2">{name}</h1>
                  </Skeleton>
                  <Button size="sm" onPress={onOpen}>
                    Edit profile
                  </Button>
                </div>
              </div>
            </CardBody>
            <CardFooter className="border-t p-0">
              {userData?.type === "Author" && (
                <div className="grid w-full grid-cols-1 text-center">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Published Books
                    </div>
                    <div className="text-lg font-semibold">
                      {userPost?.length}
                    </div>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Your Name
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Name"
                    placeholder={name}
                    type="text"
                    variant="bordered"
                    onChange={(e) => setName(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={updateProfile}>
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </>
  );
}

const UserIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30px"
      xmlns="http://www.w3.org/2000/svg"
      data-slot="trigger"
      aria-haspopup="true"
      aria-expanded="true"
      id="react-aria616481545-:rq:"
      className="z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased border rounded-xl cursor-pointer"
      type="button"
      aria-controls="react-aria616481545-:rr:"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle cx="12" cy="6" r="4" fill="#17C964"></circle>{" "}
        <path
          opacity="0.5"
          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
          fill="#17C964"
        ></path>{" "}
      </g>
    </svg>
  );
};
