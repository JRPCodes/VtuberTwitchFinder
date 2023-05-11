import {
    Box,
    Checkbox,
    CheckboxGroup,
    CheckboxGroupProps,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    StackProps,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import {SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";

type CheckboxFilterProps = Omit<CheckboxGroupProps, 'onChange'> & {
    hideLabel?: boolean
    options: Array<{ label: string; value: string; count?: number }>
    label?: string
    onChange?: (value: string[]) => void
    spacing?: StackProps['spacing']
    showSearch?: boolean
}

export default function CheckboxFilter(props: CheckboxFilterProps) {
    const {options, label, hideLabel, spacing = '2', showSearch, ...rest} = props
    const [searchValue, updateSearchValue] = useState("");

    return (
        <Stack as="fieldset" spacing={spacing}>
            {!hideLabel && (
                <FormLabel fontWeight="semibold" as="legend" mb="0">
                    {label}
                </FormLabel>
            )}
            {showSearch && (
                <InputGroup size="md" pb="1">
                    <Input
                        placeholder="Search..."
                        rounded="md"
                        focusBorderColor={mode('blue.500', 'blue.200')}
                        onChange={(val) => {
                            updateSearchValue(val.currentTarget.value)
                        }}
                    />
                    <InputRightElement pointerEvents="none" color="gray.400" fontSize="lg">
                        <SearchIcon/>
                    </InputRightElement>
                </InputGroup>
            )}
            <CheckboxGroup {...rest}>
                {options.map((option) => (
                    <Box>
                        {searchValue === "" || option.value.toLowerCase().match(searchValue.toLowerCase()) ? (
                            <Checkbox key={option.value} value={option.value} colorScheme="blue">
                                <span>{option.label}</span>
                                {option.count != null && (
                                    <Box as="span" color="gray.500" fontSize="sm">
                                        {' '}
                                        ({option.count})
                                    </Box>
                                )}
                            </Checkbox>) : (<div></div>)}
                    </Box>
                ))}
            </CheckboxGroup>
        </Stack>
    )
}
