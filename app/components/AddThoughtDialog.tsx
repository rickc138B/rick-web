import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PinataSDK } from "pinata-web3";
import { Dispatch, SetStateAction, useState } from "react";
const formatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 4,
  useGrouping: false,
});
type AddThoughtDialogProps = {
pinata:PinataSDK;
open: boolean;
setIsOpen: Dispatch<SetStateAction<boolean>>;
lastUid: string
}
export default function AddThoughtDialog({ pinata, open, setIsOpen, lastUid }: AddThoughtDialogProps) {
  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  async function uploadFile() {
    try {
      setLoading(true);
      const file = new File(
        [value],
        `${formatter.format(Number(lastUid) + 1)}.md`,
        {
          type: "text/markdown",
        }
      );

      const upload = await pinata.upload.file(file).addMetadata({
        keyValues: {
          uid: formatter.format(Number(lastUid) + 1),
          tag: tag,
        },
      });
      console.log(upload);
      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>Add thought +</DialogTrigger>
      <DialogContent className="bg-black text-white ">
        <DialogHeader>
          <DialogTitle>Add new Thought</DialogTitle>
          <DialogDescription>
            <label htmlFor="thougth">Thought</label>
            <textarea
              name="thought"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full my-4 border border-black rounded-md p-3 bg-white/70 text-black text-lg font-semibold"
              rows={10}
            />
            <label htmlFor="tag">Tag</label>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              type="text"
              name="tag"
              className="w-full bg-white/70 text-black text-lg font-semibold my-4 p-2 rounded-md"
            />

            <div className="flex justify-end">
              <button
                disabled={loading}
                className="bg-white p-2 rounded text-black"
                onClick={uploadFile}
              >
                {loading ? "..." : "Submit"}
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
