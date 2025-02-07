import styled from 'styled-components';

interface TypographyProps {
  variant:
    | 'headingLarge'
    | 'headingMedium'
    | 'headingSmall'
    | 'headingXSmall'
    | 'headingXxSmall'
    | 'headingXxxSmall'
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    | 'titleXSmall'
    | 'titleXxSmall'
    | 'titleXxxSmall'
    | 'bodyContent'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    | 'bodyXSmall'
    | 'captionDefault';
}

const Typography = styled.div<TypographyProps>`
  ${({ theme, variant }) => {
    const typography = theme.typography;

    switch (variant) {
      /* Caption */
      case 'captionDefault':
        return `
        font-size: ${typography.caption.default.size};
        font-weight: ${typography.caption.default.weight};
        line-height: ${typography.caption.default.lineHeight};
        letter-spacing: ${typography.caption.default.letterSpacing};
      `;
      /* Heading */
      case 'headingLarge':
        return `
          font-size: ${typography.heading.large.size};
          font-weight: ${typography.heading.large.weight};
          line-height: ${typography.heading.large.lineHeight};
          letter-spacing: ${typography.heading.large.letterSpacing};
        `;
      case 'headingMedium':
        return `
          font-size: ${typography.heading.medium.size};
          font-weight: ${typography.heading.medium.weight};
          line-height: ${typography.heading.medium.lineHeight};
          letter-spacing: ${typography.heading.medium.letterSpacing};
        `;
      case 'headingSmall':
        return `
          font-size: ${typography.heading.small.size};
          font-weight: ${typography.heading.small.weight};
          line-height: ${typography.heading.small.lineHeight};
          letter-spacing: ${typography.heading.small.letterSpacing};
        `;
      case 'headingXSmall':
        return `
          font-size: ${typography.heading.xsmall.size};
          font-weight: ${typography.heading.xsmall.weight};
          line-height: ${typography.heading.xsmall.lineHeight};
          letter-spacing: ${typography.heading.xsmall.letterSpacing};
        `;
      case 'headingXxSmall':
        return `
          font-size: ${typography.heading.xxsmall.size};
          font-weight: ${typography.heading.xxsmall.weight};
          line-height: ${typography.heading.xxsmall.lineHeight};
          letter-spacing: ${typography.heading.xxsmall.letterSpacing};
        `;
      case 'headingXxxSmall':
        return `
            font-size: ${typography.heading.xxxsmall.size};
            font-weight: ${typography.heading.xxxsmall.weight};
            line-height: ${typography.heading.xxxsmall.lineHeight};
            letter-spacing: ${typography.heading.xxxsmall.letterSpacing};
          `;

      /* Title */
      case 'titleLarge':
        return `
          font-size: ${typography.title.large.size};
          font-weight: ${typography.title.large.weight};
          line-height: ${typography.title.large.lineHeight};
          letter-spacing: ${typography.title.large.letterSpacing};
        `;
      case 'titleMedium':
        return `
          font-size: ${typography.title.medium.size};
          font-weight: ${typography.title.medium.weight};
          line-height: ${typography.title.medium.lineHeight};
          letter-spacing: ${typography.title.medium.letterSpacing};
        `;
      case 'titleSmall':
        return `
          font-size: ${typography.title.small.size};
          font-weight: ${typography.title.small.weight};
          line-height: ${typography.title.small.lineHeight};
          letter-spacing: ${typography.title.small.letterSpacing};
        `;
      case 'titleXSmall':
        return `
          font-size: ${typography.title.xsmall.size};
          font-weight: ${typography.title.xsmall.weight};
          line-height: ${typography.title.xsmall.lineHeight};
          letter-spacing: ${typography.title.xsmall.letterSpacing};
        `;
      case 'titleXxSmall':
        return `
            font-size: ${typography.title.xxsmall.size};
            font-weight: ${typography.title.xxsmall.weight};
            line-height: ${typography.title.xxsmall.lineHeight};
            letter-spacing: ${typography.title.xxsmall.letterSpacing};
          `;
      case 'titleXxxSmall':
        return `
            font-size: ${typography.title.xxxsmall.size};
            font-weight: ${typography.title.xxxsmall.weight};
            line-height: ${typography.title.xxxsmall.lineHeight};
            letter-spacing: ${typography.title.xxxsmall.letterSpacing};
          `;
      /* Body */
      case 'bodyContent':
        return `
          font-size: ${typography.body.content.size};
          font-weight: ${typography.body.content.weight};
          line-height: ${typography.body.content.lineHeight};
          letter-spacing: ${typography.body.content.letterSpacing};
        `;
      case 'bodyLarge':
        return `
          font-size: ${typography.body.large.size};
          font-weight: ${typography.body.large.weight};
          line-height: ${typography.body.large.lineHeight};
          letter-spacing: ${typography.body.large.letterSpacing};
        `;
      case 'bodyMedium':
        return `
          font-size: ${typography.body.medium.size};
          font-weight: ${typography.body.medium.weight};
          line-height: ${typography.body.medium.lineHeight};
          letter-spacing: ${typography.body.medium.letterSpacing};
        `;
      case 'bodySmall':
        return `
          font-size: ${typography.body.small.size};
          font-weight: ${typography.body.small.weight};
          line-height: ${typography.body.small.lineHeight};
          letter-spacing: ${typography.body.small.letterSpacing};
        `;
      case 'bodyXSmall':
        return `
        font-size: ${typography.body.xsmall.size};
        font-weight: ${typography.body.xsmall.weight};
        line-height: ${typography.body.xsmall.lineHeight};
        letter-spacing: ${typography.body.xsmall.letterSpacing};
      `;

      default:
        return '';
    }
  }}
`;

export default Typography;
