import 'package:expandable/expandable.dart';
import 'package:flutter/material.dart';
import 'package:photos/ente_theme_data.dart';
import 'package:photos/theme/ente_theme.dart';

class MenuItemWidget extends StatefulWidget {
  final Widget captionedTextWidget;
  final bool isExpandable;

  /// leading icon can be passed without specifing size of icon,
  /// this component sets size to 20x20 irrespective of passed icon's size
  final IconData? leadingIcon;
  final Color? leadingIconColor;

  final Widget? leadingIconWidget;
  // leadIconSize deafult value is 20.
  final double leadingIconSize;

  /// trailing icon can be passed without size as default size set by
  /// flutter is what this component expects
  final IconData? trailingIcon;
  final Color? trailingIconColor;
  final Widget? trailingWidget;
  final bool trailingIconIsMuted;
  final VoidCallback? onTap;
  final VoidCallback? onDoubleTap;
  final Color? menuItemColor;
  final bool alignCaptionedTextToLeft;
  final double borderRadius;
  final Color? pressedColor;
  final ExpandableController? expandableController;
  final bool isBottomBorderRadiusRemoved;
  final bool isTopBorderRadiusRemoved;

  /// disable gesture detector if not used
  final bool isGestureDetectorDisabled;

  const MenuItemWidget({
    required this.captionedTextWidget,
    this.isExpandable = false,
    this.leadingIcon,
    this.leadingIconColor,
    this.leadingIconSize = 20.0,
    this.leadingIconWidget,
    this.trailingIcon,
    this.trailingIconColor,
    this.trailingWidget,
    this.trailingIconIsMuted = false,
    this.onTap,
    this.onDoubleTap,
    this.menuItemColor,
    this.alignCaptionedTextToLeft = false,
    this.borderRadius = 4.0,
    this.pressedColor,
    this.expandableController,
    this.isBottomBorderRadiusRemoved = false,
    this.isTopBorderRadiusRemoved = false,
    this.isGestureDetectorDisabled = false,
    Key? key,
  }) : super(key: key);

  @override
  State<MenuItemWidget> createState() => _MenuItemWidgetState();
}

class _MenuItemWidgetState extends State<MenuItemWidget> {
  Color? menuItemColor;

  @override
  void initState() {
    menuItemColor = widget.menuItemColor;
    if (widget.expandableController != null) {
      widget.expandableController!.addListener(() {
        setState(() {});
      });
    }
    super.initState();
  }

  @override
  void didChangeDependencies() {
    menuItemColor = widget.menuItemColor;
    super.didChangeDependencies();
  }

  @override
  void dispose() {
    if (widget.expandableController != null) {
      widget.expandableController!.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return widget.isExpandable || widget.isGestureDetectorDisabled
        ? menuItemWidget(context)
        : GestureDetector(
            onTap: widget.onTap,
            onDoubleTap: widget.onDoubleTap,
            onTapDown: _onTapDown,
            onTapUp: _onTapUp,
            onTapCancel: _onCancel,
            child: menuItemWidget(context),
          );
  }

  Widget menuItemWidget(BuildContext context) {
    final enteColorScheme = Theme.of(context).colorScheme.enteTheme.colorScheme;
    final borderRadius = Radius.circular(widget.borderRadius);
    final isExpanded = widget.expandableController?.value;
    final bottomBorderRadius =
        (isExpanded != null && isExpanded) || widget.isBottomBorderRadiusRemoved
            ? const Radius.circular(0)
            : borderRadius;
    final topBorderRadius = widget.isTopBorderRadiusRemoved
        ? const Radius.circular(0)
        : borderRadius;
    return AnimatedContainer(
      duration: const Duration(milliseconds: 20),
      width: double.infinity,
      padding: const EdgeInsets.only(left: 16, right: 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
          topLeft: topBorderRadius,
          topRight: topBorderRadius,
          bottomLeft: bottomBorderRadius,
          bottomRight: bottomBorderRadius,
        ),
        color: menuItemColor,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          widget.alignCaptionedTextToLeft && widget.leadingIcon == null
              ? const SizedBox.shrink()
              : Padding(
                  padding: const EdgeInsets.only(right: 10),
                  child: SizedBox(
                    height: widget.leadingIconSize,
                    width: widget.leadingIconSize,
                    child: widget.leadingIcon == null
                        ? (widget.leadingIconWidget != null
                            ? FittedBox(
                                fit: BoxFit.contain,
                                child: widget.leadingIconWidget,
                              )
                            : const SizedBox.shrink())
                        : FittedBox(
                            fit: BoxFit.contain,
                            child: Icon(
                              widget.leadingIcon,
                              color: widget.leadingIconColor ??
                                  enteColorScheme.strokeBase,
                            ),
                          ),
                  ),
                ),
          widget.captionedTextWidget,
          widget.expandableController != null
              ? AnimatedOpacity(
                  duration: const Duration(milliseconds: 100),
                  curve: Curves.easeInOut,
                  opacity: isExpanded! ? 0 : 1,
                  child: AnimatedSwitcher(
                    transitionBuilder: (child, animation) {
                      return ScaleTransition(scale: animation, child: child);
                    },
                    duration: const Duration(milliseconds: 200),
                    switchInCurve: Curves.easeOut,
                    child: isExpanded
                        ? const SizedBox.shrink()
                        : Icon(
                            widget.trailingIcon,
                            color: widget.trailingIconColor,
                          ),
                  ),
                )
              : widget.trailingIcon != null
                  ? Icon(
                      widget.trailingIcon,
                      color: widget.trailingIconIsMuted
                          ? enteColorScheme.strokeMuted
                          : widget.trailingIconColor,
                    )
                  : widget.trailingWidget ?? const SizedBox.shrink(),
        ],
      ),
    );
  }

  void _onTapDown(details) {
    setState(() {
      if (widget.pressedColor == null) {
        hasPassedGestureCallbacks()
            ? menuItemColor = getEnteColorScheme(context).fillFaintPressed
            : menuItemColor = widget.menuItemColor;
      } else {
        menuItemColor = widget.pressedColor;
      }
    });
  }

  bool hasPassedGestureCallbacks() {
    return widget.onDoubleTap != null || widget.onTap != null;
  }

  void _onTapUp(details) {
    Future.delayed(
      const Duration(milliseconds: 100),
      () => setState(() {
        menuItemColor = widget.menuItemColor;
      }),
    );
  }

  void _onCancel() {
    setState(() {
      menuItemColor = widget.menuItemColor;
    });
  }
}
