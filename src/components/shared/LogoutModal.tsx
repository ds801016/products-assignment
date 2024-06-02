import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useUser from "@/hooks/useUser";
import { DialogPropType } from "@/types/general";

interface PropTypes extends DialogPropType {}

const LogoutModal = (props: PropTypes) => {
  const { logout } = useUser();
  return (
    <Dialog open={props.show} onOpenChange={props.hide}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logging Out</DialogTitle>
        </DialogHeader>
        <div>
          <p>Are you sure you want to log out?</p>
        </div>
        <DialogFooter>
          <div className="flex gap-1 justify-center items-center">
            <Button onClick={props.hide} variant="outline">
              No
            </Button>
            <Button
              onClick={() => {
                logout();
                props.hide();
              }}
              variant="destructive"
            >
              Yes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
