/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "kakao" | "profileEdit" | "interestEdit" | "pageUp" | "pageDown" | "signUp" | "emailCheck";
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", children, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
export default Button;

const StyledButton = styled.button<{ variant: "primary" | "kakao" | "profileEdit" | "interestEdit" | "pageUp" | "pageDown" | "signUp" | "emailCheck" }>`

  display: flex;
  width: 616px;
  height: 72px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary[500]};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.title.xsmall.size};
  font-weight: ${({ theme }) => theme.typography.title.xsmall.weight};
  line-height: ${({ theme }) => theme.typography.title.xsmall.lineHeight};
  letter-spacing: 0.3px;
  ${(props) =>
    props.variant === "primary" &&
    css`
      background: ${({ theme }) => theme.colors.primary[500]};
      color: #fff;
      padding: 29px 204px;
    `}
  ${(props) =>
    props.variant === "kakao" &&
    css`
      background: #fee500;
    `}

  ${(props) =>
    props.variant === "profileEdit" &&
    css`
      width: 200px;
      height: 60px;
      background: ${({ theme }) => theme.colors.primary[500]};
      color: #fff;
      padding: 29px;
      font-size: ${({ theme }) => theme.typography.title.xxxsmall.size};
      font-weight: ${({ theme }) => theme.typography.title.xxxsmall.weight};
      line-height: ${({ theme }) => theme.typography.title.xxxsmall.lineHeight};
    `}
    
  ${(props) =>
    props.variant === "interestEdit" &&
    css`
      width: 212px;
      height: 60px;
      background: ${({ theme }) => theme.colors.primary[500]};
      color: #fff;
      font-size: ${({ theme }) => theme.typography.title.xxxsmall.size};
      font-weight: ${({ theme }) => theme.typography.title.xxxsmall.weight};
      line-height: ${({ theme }) => theme.typography.title.xxxsmall.lineHeight};
    `}

  ${(props) =>
    props.variant === "pageUp" &&
    css`
      width: 160px;
      height: 72px;
      background: ${({ theme }) => theme.colors.primary[500]};
      color: #fff;
      font-size: ${({ theme }) => theme.typography.title.xxsmall.size};
      font-weight: ${({ theme }) => theme.typography.title.xxsmall.weight};
      line-height: ${({ theme }) => theme.typography.title.xxsmall.lineHeight};
    `}

  ${(props) =>
    props.variant === "pageDown" &&
    css`
      width: 160px;
      height: 72px;
      background: ${({ theme }) => theme.colors.text.white};
      border: 1px solid ${({ theme }) => theme.colors.primary[500]};
      color: ${({ theme }) => theme.colors.primary[500]};
      font-size: ${({ theme }) => theme.typography.title.xxsmall.size};
      font-weight: ${({ theme }) => theme.typography.title.xxsmall.weight};
      line-height: ${({ theme }) => theme.typography.title.xxsmall.lineHeight};
    `}

  ${(props) =>
    props.variant === "signUp" &&
    css`
      width: 320px;
      height: 72px;
      background: ${({ theme }) => theme.colors.primary[500]};
      border: 1px solid ${({ theme }) => theme.colors.primary[500]};
      color: ${({ theme }) => theme.colors.text.white};
      font-size: ${({ theme }) => theme.typography.title.xxsmall.size};
      font-weight: ${({ theme }) => theme.typography.title.xxsmall.weight};
      line-height: ${({ theme }) => theme.typography.title.xxsmall.lineHeight};
    `}

  ${(props) =>
    props.variant === "emailCheck" &&
    css`
      min-width: 184px;
      width: 184px;
      height: 72px;
      background: ${({ theme }) => theme.colors.primary[500]};
      border: 1px solid ${({ theme }) => theme.colors.primary[500]};
      color: ${({ theme }) => theme.colors.text.white};
      font-size: ${({ theme }) => theme.typography.body.medium.size};
      font-weight: ${({ theme }) => theme.typography.body.medium.weight};
      line-height: ${({ theme }) => theme.typography.body.medium.lineHeight};
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.colors.text.gray};
      color: ${theme.colors.text.white};
      cursor: not-allowed;
      opacity: 0.6;
    `}
`;
