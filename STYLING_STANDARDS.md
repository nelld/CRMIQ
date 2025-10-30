# Styling Standards & Guidelines

This document establishes the consistent styling patterns to be used across all pages in the CRM IQ application.

## Core Principles

1. **Use Utility Classes Over Inline Styles** - Prefer predefined utility classes for consistency
2. **No Custom Colors for Common Elements** - Let default styles handle common patterns
3. **Maintain Design System** - All styling should reference the base design system

## Utility Class Rules

### Text Sizing

**Rule:** For any smaller text, use `text-sm` class

```html
<!-- ✅ Correct -->
<span class="text-sm">12 units</span>

<!-- ❌ Incorrect -->
<span style="font-size: 12px;">12 units</span>
```

**Applies to:**
- Helper text
- Meta information (e.g., "One-Time • Application • Required")
- Unit counts (e.g., "(16 units)")
- Supplementary information

---

### Text Color - Muted

**Rule:** For any muted/gray text, use `text-muted` class

```html
<!-- ✅ Correct -->
<span class="text-muted">Last Published</span>

<!-- ❌ Incorrect -->
<span style="color: #6b7280;">Last Published</span>
```

**Applies to:**
- Labels
- Secondary information
- Timestamps
- Placeholder-style text
- "No template" or similar inactive states

---

### Text Color - Danger/Error

**Rule:** For any red/error text, use `text-danger` class

```html
<!-- ✅ Correct -->
<span class="text-danger">Error: Invalid input</span>

<!-- ❌ Incorrect -->
<span style="color: red;">Error: Invalid input</span>
```

**Applies to:**
- Error messages
- Validation errors
- Warning states
- Destructive action labels

---

### Links

**Rule:** For any link, do NOT define custom colors - let default link styles handle it

```html
<!-- ✅ Correct -->
<a href="#">Standard Move-In</a>
<a href="#" class="text-sm">Standard Move-In</a>

<!-- ❌ Incorrect -->
<a href="#" style="color: #0072ce;">Standard Move-In</a>
<a href="#" class="text-primary">Standard Move-In</a>
```

**Applies to:**
- Text links
- Template links
- Navigation links
- Footer links

**Exception:** Button-styled links use `btn btn-link` (see below)

---

### Button Links

**Rule:** For button-styled links, use `btn btn-link` classes

```html
<!-- ✅ Correct -->
<button class="btn btn-link">
    <i class="fas fa-image"></i>
    <span>View Floor Plans</span>
</button>

<!-- ❌ Incorrect -->
<button class="btn btn-light" style="color: #0072ce;">View Floor Plans</button>
<a href="#" class="btn btn-primary">View Floor Plans</a>
```

**Applies to:**
- Action buttons styled as links
- Secondary actions
- Tertiary navigation items

---

### Button Icons

**Rule:** For add/create buttons, use `fa-circle-plus` icon (NOT `fa-plus`)

```html
<!-- ✅ Correct -->
<button class="btn btn-primary">
    <i class="fas fa-circle-plus"></i>
    Add Fee
</button>

<button class="btn btn-primary">
    <i class="fas fa-circle-plus"></i>
    Add New
</button>

<!-- ❌ Incorrect -->
<button class="btn btn-primary">
    <i class="fas fa-plus"></i>
    Add Fee
</button>
```

**Applies to:**
- Add buttons
- Create buttons
- New item buttons
- Any action that creates/adds something

---

### Alerts

**Rule:** For any alert/notification message, use Bootstrap `alert` classes - do NOT use custom styling

```html
<!-- ✅ Correct -->
<div class="alert alert-warning">
    <i class="fas fa-exclamation-circle"></i>
    <strong>Unpublished Changes:</strong>
    Changes here are not visible to applicants until published.
</div>

<div class="alert alert-danger">
    <i class="fas fa-exclamation-triangle"></i>
    Error: Unable to save changes.
</div>

<div class="alert alert-info">
    <i class="fas fa-info-circle"></i>
    Your changes have been saved.
</div>

<!-- ❌ Incorrect -->
<div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 12px;">
    <span style="color: #856404;">Warning message</span>
</div>
```

**Available Alert Types:**
- `alert-primary` - Primary/informational alerts (blue)
- `alert-success` - Success messages (green)
- `alert-warning` - Warning messages (yellow/amber)
- `alert-danger` - Error messages (red)
- `alert-info` - Information messages (light blue)
- `alert-light` - Light/neutral alerts
- `alert-dark` - Dark alerts

**Applies to:**
- Warning notifications
- Error messages
- Success confirmations
- Informational messages
- Status updates
- System notifications

**Additional Options:**
- Add `alert-dismissible` for closeable alerts
- Use with buttons for action alerts
- Can be combined with flexbox for custom layouts (but keep `alert` classes for styling)

---

## Combination Classes

Classes can be combined for comprehensive styling:

```html
<!-- Small muted text -->
<span class="text-sm text-muted">Unit Types</span>

<!-- Small link -->
<a href="#" class="text-sm">Standard Move-In</a>

<!-- Small danger text -->
<span class="text-sm text-danger">Required field</span>
```

---

## Implementation Checklist

When creating new pages or components:

- [ ] Replace `font-size: 12px` or similar with `text-sm`
- [ ] Replace `color: #6b7280` or gray colors with `text-muted`
- [ ] Replace `color: red` or similar with `text-danger`
- [ ] Remove `color` from `<a>` tags
- [ ] Use `btn btn-link` for button-styled links
- [ ] Use `fa-circle-plus` icon for all add/create buttons
- [ ] Use Bootstrap `alert` classes for all alerts/notifications
- [ ] Check all inline styles can be replaced with utility classes
- [ ] Verify hover states work correctly with default styles

---

## Reference Classes

These classes are defined in `base.css`:

- `.text-sm` - Small text (12px)
- `.text-muted` - Muted gray color (#6b7280)
- `.text-danger` - Danger/error red color
- `.btn` - Base button styles
- `.btn-link` - Link-styled button
- `.btn-primary` - Primary action button
- `.btn-light` - Light/secondary button
- `.alert` - Base alert styles
- `.alert-warning` - Warning alert (yellow/amber)
- `.alert-danger` - Danger alert (red)
- `.alert-success` - Success alert (green)
- `.alert-info` - Info alert (light blue)
- `.alert-primary` - Primary alert (blue)

---

## Examples from Current Implementation

### Fees Table Headers

```html
<div class="unit-type-header">
    <div class="unit-type-name">1BR-A</div>
    <div class="unit-type-info text-sm text-muted">(16 units)</div>
    <a href="#" class="text-sm">Standard Move-In</a>
</div>
```

### Fee Metadata

```html
<div class="fee-name">
    <i class="fas fa-circle" style="color: #10b981; font-size: 8px;"></i>
    <span style="font-weight: 500;">Application Fee</span>
</div>
<div class="fee-meta text-sm text-muted">One-Time • Application • Required</div>
```

### Page Header Actions

```html
<button class="btn btn-link flex items-center gap-2">
    <i class="fas fa-image"></i>
    <span>View Floor Plans</span>
</button>
```

### Alert Messages

```html
<!-- Warning Alert with Actions -->
<div class="alert alert-warning" style="display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; align-items: center; gap: 12px;">
        <i class="fas fa-exclamation-circle"></i>
        <span style="font-weight: 500;">Unpublished Changes:</span>
        <span>Changes here are not visible to applicants until published.</span>
    </div>
    <div style="display: flex; gap: 12px;">
        <button class="btn btn-light">Preview</button>
        <button class="btn btn-primary">Publish Changes</button>
    </div>
</div>
```

---

## Migration Notes

When updating existing pages:

1. **Search for inline color styles** - Replace with appropriate utility classes
2. **Search for font-size in styles** - Replace with `text-sm` where appropriate
3. **Review all `<a>` tags** - Remove custom colors
4. **Check button styles** - Use `btn-link` where appropriate
5. **Replace custom alert styling** - Use Bootstrap `alert` classes instead of custom background/border/padding
6. **Test hover states** - Ensure default styles work correctly

---

## Questions?

If you're unsure which class to use:
- Check `base.css` for available utility classes
- Look at similar elements in existing pages
- Follow the principle: utility classes > custom styles

