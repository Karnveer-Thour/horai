// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'smb.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Smb _$SmbFromJson(Map<String, dynamic> json) => Smb(
      json['smbId'] as String,
      json['amoId'] as String,
      json['name'] as String? ?? '',
      json['email'] as String? ?? '',
      (json['imageUrls'] as List<dynamic>?)?.map((e) => e as String).toList() ??
          [],
      json['description'] as String? ?? '',
      json['precaution'] as String? ?? '',
      json['cancelationPolicy'] as String? ?? '',
      json['address'] as String? ?? '',
      const TimeOfDayConvert().fromJson(json['openTime'] as String),
      const TimeOfDayConvert().fromJson(json['closeTime'] as String),
      (json['reservableItemMapImageUrls'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      json['logoUrl'] as String? ?? '',
      json['facilityIntroduction'] as String? ?? '',
      DateTime.parse(json['createdAt'] as String),
      DateTime.parse(json['updatedAt'] as String),
      (json['optionalEmails'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
      json['resourceType'] as String? ?? '',
      json['cancellationPolicyOfReservation'] as String? ?? '',
      json['isActive'] as bool? ?? true,
      json['precautionOfReservation'] as String? ?? '',
    );

Map<String, dynamic> _$SmbToJson(Smb instance) => <String, dynamic>{
      'smbId': instance.smbId,
      'amoId': instance.amoId,
      'name': instance.name,
      'email': instance.email,
      'imageUrls': instance.imageUrls,
      'description': instance.description,
      'precaution': instance.precaution,
      'cancelationPolicy': instance.cancelationPolicy,
      'address': instance.address,
      'openTime': const TimeOfDayConvert().toJson(instance.openTime),
      'closeTime': const TimeOfDayConvert().toJson(instance.closeTime),
      'reservableItemMapImageUrls': instance.reservableItemMapImageUrls,
      'logoUrl': instance.logoUrl,
      'facilityIntroduction': instance.facilityIntroduction,
      'createdAt': instance.createdAt.toIso8601String(),
      'updatedAt': instance.updatedAt.toIso8601String(),
      'optionalEmails': instance.optionalEmails,
      'resourceType': instance.resourceType,
      'cancellationPolicyOfReservation':
          instance.cancellationPolicyOfReservation,
      'precautionOfReservation': instance.precautionOfReservation,
      'isActive': instance.isActive,
    };
