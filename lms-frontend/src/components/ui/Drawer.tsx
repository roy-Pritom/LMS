import { Drawer } from "antd";

interface ReusableDrawerProps {
  title: string | React.ReactNode;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  title,
  open,
  onClose,
  children,
}) => {
  return (
    <Drawer title={title} onClose={onClose} open={open}>
      {children}
    </Drawer>
  );
};

export default ReusableDrawer;
