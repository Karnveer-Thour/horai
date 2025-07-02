// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'services_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$ServicesState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function() loading,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(
            List<ServicesModel>? list, List<String>? categories)
        success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function()? loading,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<ServicesModel>? list, List<String>? categories)?
        success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function()? loading,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<ServicesModel>? list, List<String>? categories)?
        success,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ServicesStateInitial value) init,
    required TResult Function(ServicesStateLoading value) loading,
    required TResult Function(ServicesStateFailure value) failure,
    required TResult Function(ServicesStateLoaded value) success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(ServicesStateInitial value)? init,
    TResult? Function(ServicesStateLoading value)? loading,
    TResult? Function(ServicesStateFailure value)? failure,
    TResult? Function(ServicesStateLoaded value)? success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ServicesStateInitial value)? init,
    TResult Function(ServicesStateLoading value)? loading,
    TResult Function(ServicesStateFailure value)? failure,
    TResult Function(ServicesStateLoaded value)? success,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ServicesStateCopyWith<$Res> {
  factory $ServicesStateCopyWith(
          ServicesState value, $Res Function(ServicesState) then) =
      _$ServicesStateCopyWithImpl<$Res, ServicesState>;
}

/// @nodoc
class _$ServicesStateCopyWithImpl<$Res, $Val extends ServicesState>
    implements $ServicesStateCopyWith<$Res> {
  _$ServicesStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$ServicesStateInitialCopyWith<$Res> {
  factory _$$ServicesStateInitialCopyWith(_$ServicesStateInitial value,
          $Res Function(_$ServicesStateInitial) then) =
      __$$ServicesStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class __$$ServicesStateInitialCopyWithImpl<$Res>
    extends _$ServicesStateCopyWithImpl<$Res, _$ServicesStateInitial>
    implements _$$ServicesStateInitialCopyWith<$Res> {
  __$$ServicesStateInitialCopyWithImpl(_$ServicesStateInitial _value,
      $Res Function(_$ServicesStateInitial) _then)
      : super(_value, _then);
}

/// @nodoc

class _$ServicesStateInitial extends ServicesStateInitial {
  const _$ServicesStateInitial() : super._();

  @override
  String toString() {
    return 'ServicesState.init()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$ServicesStateInitial);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function() loading,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(
            List<ServicesModel>? list, List<String>? categories)
        success,
  }) {
    return init();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function()? loading,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<ServicesModel>? list, List<String>? categories)?
        success,
  }) {
    return init?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function()? loading,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<ServicesModel>? list, List<String>? categories)?
        success,
    required TResult orElse(),
  }) {
    if (init != null) {
      return init();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ServicesStateInitial value) init,
    required TResult Function(ServicesStateLoading value) loading,
    required TResult Function(ServicesStateFailure value) failure,
    required TResult Function(ServicesStateLoaded value) success,
  }) {
    return init(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(ServicesStateInitial value)? init,
    TResult? Function(ServicesStateLoading value)? loading,
    TResult? Function(ServicesStateFailure value)? failure,
    TResult? Function(ServicesStateLoaded value)? success,
  }) {
    return init?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ServicesStateInitial value)? init,
    TResult Function(ServicesStateLoading value)? loading,
    TResult Function(ServicesStateFailure value)? failure,
    TResult Function(ServicesStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (init != null) {
      return init(this);
    }
    return orElse();
  }
}

abstract class ServicesStateInitial extends ServicesState {
  const factory ServicesStateInitial() = _$ServicesStateInitial;
  const ServicesStateInitial._() : super._();
}

/// @nodoc
abstract class _$$ServicesStateLoadingCopyWith<$Res> {
  factory _$$ServicesStateLoadingCopyWith(_$ServicesStateLoading value,
          $Res Function(_$ServicesStateLoading) then) =
      __$$ServicesStateLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class __$$ServicesStateLoadingCopyWithImpl<$Res>
    extends _$ServicesStateCopyWithImpl<$Res, _$ServicesStateLoading>
    implements _$$ServicesStateLoadingCopyWith<$Res> {
  __$$ServicesStateLoadingCopyWithImpl(_$ServicesStateLoading _value,
      $Res Function(_$ServicesStateLoading) _then)
      : super(_value, _then);
}

/// @nodoc

class _$ServicesStateLoading extends ServicesStateLoading {
  const _$ServicesStateLoading() : super._();

  @override
  String toString() {
    return 'ServicesState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$ServicesStateLoading);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function() loading,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(
            List<ServicesModel>? list, List<String>? categories)
        success,
  }) {
    return loading();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function()? loading,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<ServicesModel>? list, List<String>? categories)?
        success,
  }) {
    return loading?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function()? loading,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<ServicesModel>? list, List<String>? categories)?
        success,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ServicesStateInitial value) init,
    required TResult Function(ServicesStateLoading value) loading,
    required TResult Function(ServicesStateFailure value) failure,
    required TResult Function(ServicesStateLoaded value) success,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(ServicesStateInitial value)? init,
    TResult? Function(ServicesStateLoading value)? loading,
    TResult? Function(ServicesStateFailure value)? failure,
    TResult? Function(ServicesStateLoaded value)? success,
  }) {
    return loading?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ServicesStateInitial value)? init,
    TResult Function(ServicesStateLoading value)? loading,
    TResult Function(ServicesStateFailure value)? failure,
    TResult Function(ServicesStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class ServicesStateLoading extends ServicesState {
  const factory ServicesStateLoading() = _$ServicesStateLoading;
  const ServicesStateLoading._() : super._();
}

/// @nodoc
abstract class _$$ServicesStateFailureCopyWith<$Res> {
  factory _$$ServicesStateFailureCopyWith(_$ServicesStateFailure value,
          $Res Function(_$ServicesStateFailure) then) =
      __$$ServicesStateFailureCopyWithImpl<$Res>;
  @useResult
  $Res call({String? failureMsg});
}

/// @nodoc
class __$$ServicesStateFailureCopyWithImpl<$Res>
    extends _$ServicesStateCopyWithImpl<$Res, _$ServicesStateFailure>
    implements _$$ServicesStateFailureCopyWith<$Res> {
  __$$ServicesStateFailureCopyWithImpl(_$ServicesStateFailure _value,
      $Res Function(_$ServicesStateFailure) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? failureMsg = freezed,
  }) {
    return _then(_$ServicesStateFailure(
      freezed == failureMsg
          ? _value.failureMsg
          : failureMsg // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc

class _$ServicesStateFailure extends ServicesStateFailure {
  const _$ServicesStateFailure(this.failureMsg) : super._();

  @override
  final String? failureMsg;

  @override
  String toString() {
    return 'ServicesState.failure(failureMsg: $failureMsg)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ServicesStateFailure &&
            (identical(other.failureMsg, failureMsg) ||
                other.failureMsg == failureMsg));
  }

  @override
  int get hashCode => Object.hash(runtimeType, failureMsg);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ServicesStateFailureCopyWith<_$ServicesStateFailure> get copyWith =>
      __$$ServicesStateFailureCopyWithImpl<_$ServicesStateFailure>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function() loading,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(
            List<ServicesModel>? list, List<String>? categories)
        success,
  }) {
    return failure(failureMsg);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function()? loading,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<ServicesModel>? list, List<String>? categories)?
        success,
  }) {
    return failure?.call(failureMsg);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function()? loading,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<ServicesModel>? list, List<String>? categories)?
        success,
    required TResult orElse(),
  }) {
    if (failure != null) {
      return failure(failureMsg);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ServicesStateInitial value) init,
    required TResult Function(ServicesStateLoading value) loading,
    required TResult Function(ServicesStateFailure value) failure,
    required TResult Function(ServicesStateLoaded value) success,
  }) {
    return failure(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(ServicesStateInitial value)? init,
    TResult? Function(ServicesStateLoading value)? loading,
    TResult? Function(ServicesStateFailure value)? failure,
    TResult? Function(ServicesStateLoaded value)? success,
  }) {
    return failure?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ServicesStateInitial value)? init,
    TResult Function(ServicesStateLoading value)? loading,
    TResult Function(ServicesStateFailure value)? failure,
    TResult Function(ServicesStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (failure != null) {
      return failure(this);
    }
    return orElse();
  }
}

abstract class ServicesStateFailure extends ServicesState {
  const factory ServicesStateFailure(final String? failureMsg) =
      _$ServicesStateFailure;
  const ServicesStateFailure._() : super._();

  String? get failureMsg;
  @JsonKey(ignore: true)
  _$$ServicesStateFailureCopyWith<_$ServicesStateFailure> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$ServicesStateLoadedCopyWith<$Res> {
  factory _$$ServicesStateLoadedCopyWith(_$ServicesStateLoaded value,
          $Res Function(_$ServicesStateLoaded) then) =
      __$$ServicesStateLoadedCopyWithImpl<$Res>;
  @useResult
  $Res call({List<ServicesModel>? list, List<String>? categories});
}

/// @nodoc
class __$$ServicesStateLoadedCopyWithImpl<$Res>
    extends _$ServicesStateCopyWithImpl<$Res, _$ServicesStateLoaded>
    implements _$$ServicesStateLoadedCopyWith<$Res> {
  __$$ServicesStateLoadedCopyWithImpl(
      _$ServicesStateLoaded _value, $Res Function(_$ServicesStateLoaded) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? list = freezed,
    Object? categories = freezed,
  }) {
    return _then(_$ServicesStateLoaded(
      list: freezed == list
          ? _value._list
          : list // ignore: cast_nullable_to_non_nullable
              as List<ServicesModel>?,
      categories: freezed == categories
          ? _value._categories
          : categories // ignore: cast_nullable_to_non_nullable
              as List<String>?,
    ));
  }
}

/// @nodoc

class _$ServicesStateLoaded extends ServicesStateLoaded {
  const _$ServicesStateLoaded(
      {final List<ServicesModel>? list, final List<String>? categories})
      : _list = list,
        _categories = categories,
        super._();

  final List<ServicesModel>? _list;
  @override
  List<ServicesModel>? get list {
    final value = _list;
    if (value == null) return null;
    if (_list is EqualUnmodifiableListView) return _list;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  final List<String>? _categories;
  @override
  List<String>? get categories {
    final value = _categories;
    if (value == null) return null;
    if (_categories is EqualUnmodifiableListView) return _categories;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  String toString() {
    return 'ServicesState.success(list: $list, categories: $categories)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ServicesStateLoaded &&
            const DeepCollectionEquality().equals(other._list, _list) &&
            const DeepCollectionEquality()
                .equals(other._categories, _categories));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(_list),
      const DeepCollectionEquality().hash(_categories));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ServicesStateLoadedCopyWith<_$ServicesStateLoaded> get copyWith =>
      __$$ServicesStateLoadedCopyWithImpl<_$ServicesStateLoaded>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function() loading,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(
            List<ServicesModel>? list, List<String>? categories)
        success,
  }) {
    return success(list, categories);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function()? loading,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<ServicesModel>? list, List<String>? categories)?
        success,
  }) {
    return success?.call(list, categories);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function()? loading,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<ServicesModel>? list, List<String>? categories)?
        success,
    required TResult orElse(),
  }) {
    if (success != null) {
      return success(list, categories);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ServicesStateInitial value) init,
    required TResult Function(ServicesStateLoading value) loading,
    required TResult Function(ServicesStateFailure value) failure,
    required TResult Function(ServicesStateLoaded value) success,
  }) {
    return success(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(ServicesStateInitial value)? init,
    TResult? Function(ServicesStateLoading value)? loading,
    TResult? Function(ServicesStateFailure value)? failure,
    TResult? Function(ServicesStateLoaded value)? success,
  }) {
    return success?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ServicesStateInitial value)? init,
    TResult Function(ServicesStateLoading value)? loading,
    TResult Function(ServicesStateFailure value)? failure,
    TResult Function(ServicesStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (success != null) {
      return success(this);
    }
    return orElse();
  }
}

abstract class ServicesStateLoaded extends ServicesState {
  const factory ServicesStateLoaded(
      {final List<ServicesModel>? list,
      final List<String>? categories}) = _$ServicesStateLoaded;
  const ServicesStateLoaded._() : super._();

  List<ServicesModel>? get list;
  List<String>? get categories;
  @JsonKey(ignore: true)
  _$$ServicesStateLoadedCopyWith<_$ServicesStateLoaded> get copyWith =>
      throw _privateConstructorUsedError;
}
