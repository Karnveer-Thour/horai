// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'news_detail_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$NewsDetailState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(NewsItem? newsItem) success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(NewsItem? newsItem)? success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(NewsItem? newsItem)? success,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NewsDetailStateInitial value) init,
    required TResult Function(NewsDetailStateFailure value) failure,
    required TResult Function(NewsDetailStateLoaded value) success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsDetailStateInitial value)? init,
    TResult? Function(NewsDetailStateFailure value)? failure,
    TResult? Function(NewsDetailStateLoaded value)? success,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsDetailStateInitial value)? init,
    TResult Function(NewsDetailStateFailure value)? failure,
    TResult Function(NewsDetailStateLoaded value)? success,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $NewsDetailStateCopyWith<$Res> {
  factory $NewsDetailStateCopyWith(
          NewsDetailState value, $Res Function(NewsDetailState) then) =
      _$NewsDetailStateCopyWithImpl<$Res, NewsDetailState>;
}

/// @nodoc
class _$NewsDetailStateCopyWithImpl<$Res, $Val extends NewsDetailState>
    implements $NewsDetailStateCopyWith<$Res> {
  _$NewsDetailStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$NewsDetailStateInitialCopyWith<$Res> {
  factory _$$NewsDetailStateInitialCopyWith(_$NewsDetailStateInitial value,
          $Res Function(_$NewsDetailStateInitial) then) =
      __$$NewsDetailStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class __$$NewsDetailStateInitialCopyWithImpl<$Res>
    extends _$NewsDetailStateCopyWithImpl<$Res, _$NewsDetailStateInitial>
    implements _$$NewsDetailStateInitialCopyWith<$Res> {
  __$$NewsDetailStateInitialCopyWithImpl(_$NewsDetailStateInitial _value,
      $Res Function(_$NewsDetailStateInitial) _then)
      : super(_value, _then);
}

/// @nodoc

class _$NewsDetailStateInitial extends NewsDetailStateInitial {
  const _$NewsDetailStateInitial() : super._();

  @override
  String toString() {
    return 'NewsDetailState.init()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$NewsDetailStateInitial);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(NewsItem? newsItem) success,
  }) {
    return init();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(NewsItem? newsItem)? success,
  }) {
    return init?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(NewsItem? newsItem)? success,
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
    required TResult Function(NewsDetailStateInitial value) init,
    required TResult Function(NewsDetailStateFailure value) failure,
    required TResult Function(NewsDetailStateLoaded value) success,
  }) {
    return init(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsDetailStateInitial value)? init,
    TResult? Function(NewsDetailStateFailure value)? failure,
    TResult? Function(NewsDetailStateLoaded value)? success,
  }) {
    return init?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsDetailStateInitial value)? init,
    TResult Function(NewsDetailStateFailure value)? failure,
    TResult Function(NewsDetailStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (init != null) {
      return init(this);
    }
    return orElse();
  }
}

abstract class NewsDetailStateInitial extends NewsDetailState {
  const factory NewsDetailStateInitial() = _$NewsDetailStateInitial;
  const NewsDetailStateInitial._() : super._();
}

/// @nodoc
abstract class _$$NewsDetailStateFailureCopyWith<$Res> {
  factory _$$NewsDetailStateFailureCopyWith(_$NewsDetailStateFailure value,
          $Res Function(_$NewsDetailStateFailure) then) =
      __$$NewsDetailStateFailureCopyWithImpl<$Res>;
  @useResult
  $Res call({String? failureMsg});
}

/// @nodoc
class __$$NewsDetailStateFailureCopyWithImpl<$Res>
    extends _$NewsDetailStateCopyWithImpl<$Res, _$NewsDetailStateFailure>
    implements _$$NewsDetailStateFailureCopyWith<$Res> {
  __$$NewsDetailStateFailureCopyWithImpl(_$NewsDetailStateFailure _value,
      $Res Function(_$NewsDetailStateFailure) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? failureMsg = freezed,
  }) {
    return _then(_$NewsDetailStateFailure(
      freezed == failureMsg
          ? _value.failureMsg
          : failureMsg // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc

class _$NewsDetailStateFailure extends NewsDetailStateFailure {
  const _$NewsDetailStateFailure(this.failureMsg) : super._();

  @override
  final String? failureMsg;

  @override
  String toString() {
    return 'NewsDetailState.failure(failureMsg: $failureMsg)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NewsDetailStateFailure &&
            (identical(other.failureMsg, failureMsg) ||
                other.failureMsg == failureMsg));
  }

  @override
  int get hashCode => Object.hash(runtimeType, failureMsg);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$NewsDetailStateFailureCopyWith<_$NewsDetailStateFailure> get copyWith =>
      __$$NewsDetailStateFailureCopyWithImpl<_$NewsDetailStateFailure>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(NewsItem? newsItem) success,
  }) {
    return failure(failureMsg);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(NewsItem? newsItem)? success,
  }) {
    return failure?.call(failureMsg);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(NewsItem? newsItem)? success,
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
    required TResult Function(NewsDetailStateInitial value) init,
    required TResult Function(NewsDetailStateFailure value) failure,
    required TResult Function(NewsDetailStateLoaded value) success,
  }) {
    return failure(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsDetailStateInitial value)? init,
    TResult? Function(NewsDetailStateFailure value)? failure,
    TResult? Function(NewsDetailStateLoaded value)? success,
  }) {
    return failure?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsDetailStateInitial value)? init,
    TResult Function(NewsDetailStateFailure value)? failure,
    TResult Function(NewsDetailStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (failure != null) {
      return failure(this);
    }
    return orElse();
  }
}

abstract class NewsDetailStateFailure extends NewsDetailState {
  const factory NewsDetailStateFailure(final String? failureMsg) =
      _$NewsDetailStateFailure;
  const NewsDetailStateFailure._() : super._();

  String? get failureMsg;
  @JsonKey(ignore: true)
  _$$NewsDetailStateFailureCopyWith<_$NewsDetailStateFailure> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$NewsDetailStateLoadedCopyWith<$Res> {
  factory _$$NewsDetailStateLoadedCopyWith(_$NewsDetailStateLoaded value,
          $Res Function(_$NewsDetailStateLoaded) then) =
      __$$NewsDetailStateLoadedCopyWithImpl<$Res>;
  @useResult
  $Res call({NewsItem? newsItem});
}

/// @nodoc
class __$$NewsDetailStateLoadedCopyWithImpl<$Res>
    extends _$NewsDetailStateCopyWithImpl<$Res, _$NewsDetailStateLoaded>
    implements _$$NewsDetailStateLoadedCopyWith<$Res> {
  __$$NewsDetailStateLoadedCopyWithImpl(_$NewsDetailStateLoaded _value,
      $Res Function(_$NewsDetailStateLoaded) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? newsItem = freezed,
  }) {
    return _then(_$NewsDetailStateLoaded(
      newsItem: freezed == newsItem
          ? _value.newsItem
          : newsItem // ignore: cast_nullable_to_non_nullable
              as NewsItem?,
    ));
  }
}

/// @nodoc

class _$NewsDetailStateLoaded extends NewsDetailStateLoaded {
  const _$NewsDetailStateLoaded({this.newsItem}) : super._();

  @override
  final NewsItem? newsItem;

  @override
  String toString() {
    return 'NewsDetailState.success(newsItem: $newsItem)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$NewsDetailStateLoaded &&
            (identical(other.newsItem, newsItem) ||
                other.newsItem == newsItem));
  }

  @override
  int get hashCode => Object.hash(runtimeType, newsItem);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$NewsDetailStateLoadedCopyWith<_$NewsDetailStateLoaded> get copyWith =>
      __$$NewsDetailStateLoadedCopyWithImpl<_$NewsDetailStateLoaded>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() init,
    required TResult Function(String? failureMsg) failure,
    required TResult Function(NewsItem? newsItem) success,
  }) {
    return success(newsItem);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? init,
    TResult? Function(String? failureMsg)? failure,
    TResult? Function(NewsItem? newsItem)? success,
  }) {
    return success?.call(newsItem);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? init,
    TResult Function(String? failureMsg)? failure,
    TResult Function(NewsItem? newsItem)? success,
    required TResult orElse(),
  }) {
    if (success != null) {
      return success(newsItem);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(NewsDetailStateInitial value) init,
    required TResult Function(NewsDetailStateFailure value) failure,
    required TResult Function(NewsDetailStateLoaded value) success,
  }) {
    return success(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(NewsDetailStateInitial value)? init,
    TResult? Function(NewsDetailStateFailure value)? failure,
    TResult? Function(NewsDetailStateLoaded value)? success,
  }) {
    return success?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(NewsDetailStateInitial value)? init,
    TResult Function(NewsDetailStateFailure value)? failure,
    TResult Function(NewsDetailStateLoaded value)? success,
    required TResult orElse(),
  }) {
    if (success != null) {
      return success(this);
    }
    return orElse();
  }
}

abstract class NewsDetailStateLoaded extends NewsDetailState {
  const factory NewsDetailStateLoaded({final NewsItem? newsItem}) =
      _$NewsDetailStateLoaded;
  const NewsDetailStateLoaded._() : super._();

  NewsItem? get newsItem;
  @JsonKey(ignore: true)
  _$$NewsDetailStateLoadedCopyWith<_$NewsDetailStateLoaded> get copyWith =>
      throw _privateConstructorUsedError;
}
