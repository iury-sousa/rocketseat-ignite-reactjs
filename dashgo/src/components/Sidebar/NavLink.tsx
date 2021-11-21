import {
  Link,
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { ElementType } from "react";

type NavLinkProps = ChakraLinkProps & {
  icon: ElementType;
  title: string;
};

export const NavLink = ({ icon, title, ...rest }: NavLinkProps) => {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {title}
      </Text>
    </Link>
  );
};
