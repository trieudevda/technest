'use client';
import { Collapse, List, ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore, Inbox, Dashboard, Category, Wallpaper, Tag, Tune, SpeakerNotes, List as ListIcon } from '@mui/icons-material';
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import ItemButton from "@/utils/helpers/template-mui/collapse/list/item";
import { PATHCONST } from "@/utils/constants";

const AdminBar = ({ props }: { prop: string }) => {
  const router = useRouter();
  const [openDashboard, setOpenDashboard] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);  
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false);
  const handleClick = () => {
    setOpenDashboard(!openDashboard);
    closeOtherItem(1);
  };
  const handleClickProduct = () => {
    setOpenProduct(!openProduct);
    closeOtherItem(2);
  };
  const handleClickInvoice = () => {
    setOpenInvoice(!openInvoice);
    closeOtherItem(3);
  };
  const handleClickComment = () => {
    setOpenComment(!openComment);
    closeOtherItem(4);
  };
  const handle = () => {
    router.push('/admin/dashboard?name=John&age=30');
  };
  function closeOtherItem(index: number) {
    switch (index) {
      case 1:
        setOpenProduct(false);
        setOpenInvoice(false);
        setOpenComment(false);
        break;
      case 2:
        setOpenDashboard(false);
        setOpenInvoice(false);
        setOpenComment(false);
        break;
      case 3:
        setOpenDashboard(false);
        setOpenProduct(false);
        setOpenComment(false);
        break;
      case 4:
        setOpenDashboard(false);
        setOpenProduct(false);
        setOpenInvoice(false);
        break;
      default:
        break;
    }
  }
  return <nav className="admin-bar bg-white rounded-r-2xl p-2 h-screen z-10">
    <Image
      loading="lazy"
      src="/images/demo/1.png"
      width={300}
      height={100}
      className="max-w-full"
      alt="avatar"
      blurDataURL="data:/images/demo/1.png"
      placeholder="blur"
    />
    <div className="scroll-bar max-w-full max-h-[80%] scroll-smooth overflow-y-auto z-10">
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Dashboard
          </ListSubheader>
        }
      >
        <ItemButton primary="Dashboard" iconbefore={<Dashboard />} onclick={handleClick} iconafter={openDashboard ? <ExpandLess /> : <ExpandMore />}></ItemButton>
        <Collapse in={openDashboard} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ItemButton primary="Dashboard" iconbefore={<Dashboard />}
              onclick={() => router.push(PATHCONST.ADMIN.DASHBOARD.INDEX)}
              sxList={{ pl: 4 }}></ItemButton>
            {/* biến thể */}
          </List>
        </Collapse>
        <ItemButton primary="Product" iconbefore={<Inbox />} onclick={handleClickProduct} iconafter={openProduct ? <ExpandLess /> : <ExpandMore />}></ItemButton>
        <Collapse in={openProduct} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ItemButton primary="Product" iconbefore={<Inbox />} sxList={{ pl: 4 }} onclick={()=>router.push(PATHCONST.ADMIN.PRODUCT.INDEX)}></ItemButton>
            <ItemButton primary="Category" iconbefore={<Category />} sxList={{ pl: 4 }}></ItemButton>
            <ItemButton primary="Image" iconbefore={<Wallpaper />} sxList={{ pl: 4 }} ></ItemButton>
            <ItemButton primary="Tag" iconbefore={<Tag />} sxList={{ pl: 4 }} ></ItemButton>
            <ItemButton primary="Variation" iconbefore={<Tune />} sxList={{ pl: 4 }} ></ItemButton>
            {/* biến thể */}
          </List>
        </Collapse>
        <ItemButton primary="Invoice" iconbefore={<ListIcon />} onclick={handleClickInvoice} iconafter={openInvoice ? <ExpandLess /> : <ExpandMore />}></ItemButton>
        <Collapse in={openInvoice} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ItemButton primary="Invoice" iconbefore={<ListIcon />} sxList={{ pl: 4 }}></ItemButton>
          </List>
        </Collapse>
        <ItemButton primary="Comment" iconbefore={<SpeakerNotes />} onclick={handleClickComment} iconafter={openComment ? <ExpandLess /> : <ExpandMore />}></ItemButton>
        <Collapse in={openComment} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ItemButton primary="Comment" iconbefore={<Inbox />} sxList={{ pl: 4 }}></ItemButton>
          </List>
        </Collapse>
      </List>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Chart
          </ListSubheader>
        }
      >
      </List>
    </div>
    <ItemButton primary="Logout" iconbefore={<Dashboard />} onclick={handle}></ItemButton>
  </nav>
}

export default AdminBar;