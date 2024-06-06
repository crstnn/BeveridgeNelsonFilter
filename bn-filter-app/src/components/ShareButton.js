import React from "react"
import ShareIcon from '@mui/icons-material/Share';
import List from "@mui/material/List"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
import Popper from "@mui/material/Popper"
import {bindPopper, bindToggle} from "material-ui-popup-state"
import Fade from "@mui/material/Fade"
import Paper from "@mui/material/Paper"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import XIcon from '@mui/icons-material/X';
import RedditIcon from "@mui/icons-material/Reddit"
import LinkIcon from "@mui/icons-material/Link"
import {usePopupState} from "material-ui-popup-state/hooks";
import {ListItemButton} from "@mui/material";

const ShareButton = ({buttonText, styles, lazyShareUrl, mnemonic}) => {

    const popupState =
        usePopupState({variant: 'popover', popupId: 'demoMenu'});

    const open = socialLink => {
        window.open(socialLink, "_blank");
    };

    const handleShare = e => {
        e.preventDefault();

        popupState.close();

        const shareUrl = lazyShareUrl();
        const encodedAhref = encodeURIComponent(shareUrl);

        switch (e.currentTarget.id) {
            case "facebook":
                return open(`https://www.facebook.com/dialog/feed?link=${encodedAhref}`);
            case "x":
                return open(`https://twitter.com/intent/tweet?url=${encodedAhref}`);
            case "reddit":
                return open(`https://new.reddit.com/submit?url=${encodedAhref}&title=Beveridge-Nelson%20Filter%20application%3A%20${mnemonic}&type=LINK`);
            case "linkedin":
                return open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedAhref}`);
            case "copy":
                return navigator.clipboard.writeText(shareUrl);
            default:
                return;
        }
    }

    return (
        <>
            <Button
                style={styles.button}
                variant="outlined"
                {...bindToggle(popupState)}
            ><ShareIcon/>{buttonText}</Button>
            <Popper {...bindPopper(popupState)} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper>
                            <List dense={true}
                                  sx={styles.shareList}>
                                <ListItemButton
                                    id="facebook"
                                    onClick={handleShare}>
                                    <ListItemIcon>
                                        <FacebookIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Facebook"/>
                                </ListItemButton>
                                <ListItemButton
                                    id="x"
                                    onClick={handleShare}>
                                    <ListItemIcon>
                                        <XIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="X"/>
                                </ListItemButton>
                                <ListItemButton
                                    id="reddit"
                                    onClick={handleShare}>
                                    <ListItemIcon>
                                        <RedditIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Reddit"/>
                                </ListItemButton>
                                <ListItemButton
                                    id="linkedin"
                                    onClick={handleShare}>
                                    <ListItemIcon>
                                        <LinkedInIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="LinkedIn"/>
                                </ListItemButton>
                                <ListItemButton
                                    id="copy"
                                    onClick={handleShare}>
                                    <ListItemIcon>
                                        <LinkIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Copy Link"/>
                                </ListItemButton>
                            </List>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    )
}

export default ShareButton;