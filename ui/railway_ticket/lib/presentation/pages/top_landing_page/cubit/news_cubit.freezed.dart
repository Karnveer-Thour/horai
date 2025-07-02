// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'news_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$NewsState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(List<NewsItem>? list) success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<NewsItem>? list)? success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<NewsItem>? list)? success,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NewsStateInitial value) init,
    required TResult Function(NewsStateFailure value) failure,
    required TResult Function(NewsStateLoaded value) success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsStateInitial value)? init,
    TResult? Function(NewsStateFailure value)? failure,
    TResult? Function(NewsStateLoaded value)? success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsStateInitial value)? init,
    TResult Function(NewsStateFailure value)? failure,
    TResult Function(NewsStateLoaded value)? success,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NewsStateCopyWith<$Res> {
  factory $NewsStateCopyWith(NewsState value, $Res Function(NewsState) then) =
      _$NewsStateCopyWithImpl<$Res, NewsState>;
}

/// @nodoc
class _$NewsStateCopyWithImpl<$Res, $Val extends NewsState>
    implements $NewsStateCopyWith<$Res> {
  _$NewsStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$NewsStateInitialCopyWith<$Res> {
  factory _$$NewsStateInitialCopyWith(
          _$NewsStateInitial value, $Res Function(_$NewsStateInitial) then) =
      __$$NewsStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class __$$NewsStateInitialCopyWithImpl<$Res>
    extends _$NewsStateCopyWithImpl<$Res, _$NewsStateInitial>
    implements _$$NewsStateInitialCopyWith<$Res> {
  __$$NewsStateInitialCopyWithImpl(
      _$NewsStateInitial _value, $Res Function(_$NewsStateInitial) _then)
      : super(_value, _then);
}

/// @nodoc

class _$NewsStateInitial extends NewsStateInitial {
  const _$NewsStateInitial() : super._();

  @override
  String toString() {
    return 'NewsState.init()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$NewsStateInitial);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(List<NewsItem>? list) success,
  }) {
    return init();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<NewsItem>? list)? success,
  }) {
    return init?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<NewsItem>? list)? success,
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
    required TResult Function(NewsStateInitial value) init,
    required TResult Function(NewsStateFailure value) failure,
    required TResult Function(NewsStateLoaded value) success,
  }) {
    return init(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsStateInitial value)? init,
    TResult? Function(NewsStateFailure value)? failure,
    TResult? Function(NewsStateLoaded value)? success,
  }) {
    return init?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsStateInitial value)? init,
    TResult Function(NewsStateFailure value)? failure,
    TResult Function(NewsStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (init != null) {
      return init(this);
    }
    return orElse();
  }
}

abstract class NewsStateInitial extends NewsState {
  const factory NewsStateInitial() = _$NewsStateInitial;
  const NewsStateInitial._() : super._();
}

/// @nodoc
abstract class _$$NewsStateFailureCopyWith<$Res> {
  factory _$$NewsStateFailureCopyWith(
          _$NewsStateFailure value, $Res Function(_$NewsStateFailure) then) =
      __$$NewsStateFailureCopyWithImpl<$Res>;
  @useResult
  $Res call({String? failureMsg});
}

/// @nodoc
class __$$NewsStateFailureCopyWithImpl<$Res>
    extends _$NewsStateCopyWithImpl<$Res, _$NewsStateFailure>
    implements _$$NewsStateFailureCopyWith<$Res> {
  __$$NewsStateFailureCopyWithImpl(
      _$NewsStateFailure _value, $Res Function(_$NewsStateFailure) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? failureMsg = freezed,
  }) {
    return _then(_$NewsStateFailure(
      freezed == failureMsg
          ? _value.failureMsg
          : failureMsg // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc

class _$NewsStateFailure extends NewsStateFailure {
  const _$NewsStateFailure(this.failureMsg) : super._();

  @override
  final String? failureMsg;

  @override
  String toString() {
    return 'NewsState.failure(failureMsg: $failureMsg)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NewsStateFailure &&
            (identical(other.failureMsg, failureMsg) ||
                other.failureMsg == failureMsg));
  }

  @override
  int get hashCode => Object.hash(runtimeType, failureMsg);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$NewsStateFailureCopyWith<_$NewsStateFailure> get copyWith =>
      __$$NewsStateFailureCopyWithImpl<_$NewsStateFailure>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(List<NewsItem>? list) success,
  }) {
    return failure(failureMsg);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<NewsItem>? list)? success,
  }) {
    return failure?.call(failureMsg);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<NewsItem>? list)? success,
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
    required TResult Function(NewsStateInitial value) init,
    required TResult Function(NewsStateFailure value) failure,
    required TResult Function(NewsStateLoaded value) success,
  }) {
    return failure(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsStateInitial value)? init,
    TResult? Function(NewsStateFailure value)? failure,
    TResult? Function(NewsStateLoaded value)? success,
  }) {
    return failure?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsStateInitial value)? init,
    TResult Function(NewsStateFailure value)? failure,
    TResult Function(NewsStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (failure != null) {
      return failure(this);
    }
    return orElse();
  }
}

abstract class NewsStateFailure extends NewsState {
  const factory NewsStateFailure(final String? failureMsg) = _$NewsStateFailure;
  const NewsStateFailure._() : super._();

  String? get failureMsg;
  @JsonKey(ignore: true)
  _$$NewsStateFailureCopyWith<_$NewsStateFailure> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$NewsStateLoadedCopyWith<$Res> {
  factory _$$NewsStateLoadedCopyWith(
          _$NewsStateLoaded value, $Res Function(_$NewsStateLoaded) then) =
      __$$NewsStateLoadedCopyWithImpl<$Res>;
  @useResult
  $Res call({List<NewsItem>? list});
}

/// @nodoc
class __$$NewsStateLoadedCopyWithImpl<$Res>
    extends _$NewsStateCopyWithImpl<$Res, _$NewsStateLoaded>
    implements _$$NewsStateLoadedCopyWith<$Res> {
  __$$NewsStateLoadedCopyWithImpl(
      _$NewsStateLoaded _value, $Res Function(_$NewsStateLoaded) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? list = freezed,
  }) {
    return _then(_$NewsStateLoaded(
      list: freezed == list
          ? _value._list
          : list // ignore: cast_nullable_to_non_nullable
              as List<NewsItem>?,
    ));
  }
}

/// @nodoc

class _$NewsStateLoaded extends NewsStateLoaded {
  const _$NewsStateLoaded({final List<NewsItem>? list})
      : _list = list,
        super._();

  final List<NewsItem>? _list;
  @override
  List<NewsItem>? get list {
    final value = _list;
    if (value == null) return null;
    if (_list is EqualUnmodifiableListView) return _list;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(value);
  }

  @override
  String toString() {
    return 'NewsState.success(list: $list)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NewsStateLoaded &&
            const DeepCollectionEquality().equals(other._list, _list));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(_list));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$NewsStateLoadedCopyWith<_$NewsStateLoaded> get copyWith =>
      __$$NewsStateLoadedCopyWithImpl<_$NewsStateLoaded>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(List<NewsItem>? list) success,
  }) {
    return success(list);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(List<NewsItem>? list)? success,
  }) {
    return success?.call(list);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(List<NewsItem>? list)? success,
    required TResult orElse(),
  }) {
    if (success != null) {
      return success(list);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NewsStateInitial value) init,
    required TResult Function(NewsStateFailure value) failure,
    required TResult Function(NewsStateLoaded value) success,
  }) {
    return success(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsStateInitial value)? init,
    TResult? Function(NewsStateFailure value)? failure,
    TResult? Function(NewsStateLoaded value)? success,
  }) {
    return success?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsStateInitial value)? init,
    TResult Function(NewsStateFailure value)? failure,
    TResult Function(NewsStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (success != null) {
      return success(this);
    }
    return orElse();
  }
}

abstract class NewsStateLoaded extends NewsState {
  const factory NewsStateLoaded({final List<NewsItem>? list}) =
      _$NewsStateLoaded;
  const NewsStateLoaded._() : super._();

  List<NewsItem>? get list;
  @JsonKey(ignore: true)
  _$$NewsStateLoadedCopyWith<_$NewsStateLoaded> get copyWith =>
      throw _privateConstructorUsedError;
}
