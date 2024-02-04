import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure
} from "@chakra-ui/react";

function DemoAlert() {
    const {
        isOpen: isVisible,
        onClose,
    } = useDisclosure({ defaultIsOpen: true })

    return isVisible ? (
        <Alert status='info'>
            <AlertIcon />
            <Box>
                <AlertTitle>This is a demo but the form is real</AlertTitle>
                <AlertDescription>
                    The form is prefilled with demo data.<br/>
                    Modify the form to generate a sustainability report.
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : null
}

export default DemoAlert;