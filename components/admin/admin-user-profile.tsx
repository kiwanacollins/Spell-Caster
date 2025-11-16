'use client';

import { UserDocument } from '@/lib/db/models/user';
import { ServiceRequest } from '@/lib/db/models/service-request';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDistanceToNow, format } from 'date-fns';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiTrendingUp,
  FiStar,
  FiShield,
} from 'react-icons/fi';

interface AdminUserProfileProps {
  user: UserDocument;
  serviceRequests?: ServiceRequest[];
  onClose?: () => void;
}

export function AdminUserProfile({
  user,
  serviceRequests = [],
  onClose,
}: AdminUserProfileProps) {
  const stats = user.stats || {};
  const spiritualProfile = user.spiritualProfile || {};
  const preferences = user.preferences || {};

  const sortedRequests = [...serviceRequests].sort(
    (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
  );

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-[#CC8800]/20 text-[#CC8800]',
      in_progress: 'bg-[#B8860B]/20 text-[#B8860B]',
      completed: 'bg-[#2C5530]/20 text-[#2C5530]',
      cancelled: 'bg-[#8B0000]/20 text-[#8B0000]',
      on_hold: 'bg-[#4A4A4A]/20 text-[#4A4A4A]',
    };
    return colors[status] || '';
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* User Header Card */}
      <Card className="bg-gradient-to-r from-[#8B6F47]/10 to-transparent border-2 border-[#8B6F47] p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-['MedievalSharp'] text-[#1A1A1A]">{user.name}</h1>
              {user.role === 'admin' && (
                <Badge className="bg-[#8B0000] text-[#F4E8D0]">
                  <FiShield className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              )}
              {user.isSuspended && (
                <Badge className="bg-[#4A4A4A] text-[#F4E8D0]">Suspended</Badge>
              )}
            </div>

            <div className="space-y-2 text-sm text-[#4A4A4A]">
              <div className="flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  <span>
                    {user.location.city}
                    {user.location.city && user.location.country && ', '}
                    {user.location.country}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#8B6F47]">${stats.lifetimeValue || 0}</p>
              <p className="text-xs text-[#4A4A4A]">Lifetime Value</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2C5530]">{stats.completedSpells || 0}</p>
              <p className="text-xs text-[#4A4A4A]">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#B8860B]">{stats.activeSpells || 0}</p>
              <p className="text-xs text-[#4A4A4A]">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#CC8800]">
                {stats.totalConsultations || 0}
              </p>
              <p className="text-xs text-[#4A4A4A]">Consultations</p>
            </div>
          </div>
        </div>

        {/* Join Date */}
        <div className="mt-4 pt-4 border-t border-[#8B6F47]/20">
          <p className="text-sm text-[#4A4A4A]">
            <FiCalendar className="w-4 h-4 inline mr-2" />
            Joined{' '}
            {formatDistanceToNow(new Date(user.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="service-history" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#8B6F47]/10 border border-[#8B6F47]">
          <TabsTrigger value="service-history" className="text-[#1A1A1A]">
            Service History
          </TabsTrigger>
          <TabsTrigger value="spiritual-profile" className="text-[#1A1A1A]">
            Spiritual Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="text-[#1A1A1A]">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="admin-notes" className="text-[#1A1A1A]">
            Admin Notes
          </TabsTrigger>
        </TabsList>

        {/* Service History Tab */}
        <TabsContent value="service-history" className="space-y-4">
          {sortedRequests.length === 0 ? (
            <Alert className="bg-[#F4E8D0] border-[#8B6F47]">
              <AlertDescription className="text-[#4A4A4A]">
                No service requests from this user yet.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {sortedRequests.map((request) => (
                <Card
                  key={request._id?.toString()}
                  className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-['MedievalSharp'] text-[#1A1A1A]">
                        {request.serviceName}
                      </h4>
                      <p className="text-sm text-[#4A4A4A]">{request.description}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-xs text-[#8B6F47]">
                        {formatDistanceToNow(new Date(request.requestedAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Spiritual Profile Tab */}
        <TabsContent value="spiritual-profile" className="space-y-4">
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spiritual Level */}
              <div>
                <label className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Spiritual Level
                </label>
                <p className="text-lg text-[#8B6F47] font-semibold">
                  {spiritualProfile.spiritualLevel || 'Not set'}
                </p>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Experience
                </label>
                <p className="text-lg text-[#8B6F47] font-semibold">
                  {spiritualProfile.experienceLevel || 'Not set'}
                </p>
              </div>

              {/* Energy Alignment */}
              <div>
                <label className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Energy Alignment
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 h-2 bg-[#8B6F47]/20 rounded">
                    <div
                      className="h-2 bg-[#2C5530] rounded"
                      style={{
                        width: `${spiritualProfile.energyAlignment || 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-[#8B6F47]">
                    {spiritualProfile.energyAlignment || 0}%
                  </span>
                </div>
              </div>

              {/* Spiritual Points */}
              <div>
                <label className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Spirit Points
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <FiStar className="w-4 h-4 text-[#B8860B]" />
                  <p className="text-lg text-[#B8860B] font-semibold">
                    {spiritualProfile.spiritualPoints || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Interests and Intentions */}
            {(spiritualProfile.spiritualInterests?.length || 0) > 0 && (
              <div className="mt-4 pt-4 border-t border-[#8B6F47]/20">
                <label className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Spiritual Interests
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {spiritualProfile.spiritualInterests?.map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-[#8B6F47] text-[#F4E8D0]"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {(spiritualProfile.primaryIntentions?.length || 0) > 0 && (
              <div className="mt-4">
                <label className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Primary Intentions
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {spiritualProfile.primaryIntentions?.map((intention) => (
                    <Badge
                      key={intention}
                      className="bg-[#2C5530] text-[#F4E8D0]"
                    >
                      {intention}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
            <div className="space-y-4">
              {/* Notification Preferences */}
              <div>
                <h4 className="font-['MedievalSharp'] text-[#1A1A1A] mb-2">
                  Notification Preferences
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-[#4A4A4A]">Email Notifications:</span>
                    <span className="text-[#8B6F47] font-semibold">
                      {preferences.notifications?.email ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#4A4A4A]">Push Notifications:</span>
                    <span className="text-[#8B6F47] font-semibold">
                      {preferences.notifications?.push ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#4A4A4A]">WhatsApp:</span>
                    <span className="text-[#8B6F47] font-semibold">
                      {preferences.notifications?.whatsapp ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Communication Style */}
              <div className="pt-4 border-t border-[#8B6F47]/20">
                <h4 className="font-['MedievalSharp'] text-[#1A1A1A] mb-2">
                  Communication
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-[#4A4A4A]">Preferred Channel:</span>
                    <span className="text-[#8B6F47] font-semibold capitalize">
                      {preferences.preferredChannel || 'Not set'}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-[#4A4A4A]">Communication Style:</span>
                    <span className="text-[#8B6F47] font-semibold capitalize">
                      {preferences.communicationStyle || 'Not set'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Admin Notes Tab */}
        <TabsContent value="admin-notes" className="space-y-4">
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
            {user.adminNotes ? (
              <div>
                <h4 className="font-['MedievalSharp'] text-[#1A1A1A] mb-2">Internal Notes</h4>
                <p className="text-[#4A4A4A] whitespace-pre-wrap">{user.adminNotes}</p>
              </div>
            ) : (
              <Alert className="bg-[#8B6F47]/10 border-[#8B6F47]">
                <AlertDescription className="text-[#4A4A4A]">
                  No internal notes yet. Click edit to add notes about this user.
                </AlertDescription>
              </Alert>
            )}
          </Card>

          {/* Suspension Info */}
          {user.isSuspended && user.suspensionReason && (
            <Card className="bg-red-900/10 border-2 border-red-700 p-6">
              <h4 className="font-['MedievalSharp'] text-red-900 mb-2">Suspension Reason</h4>
              <p className="text-red-800 whitespace-pre-wrap">{user.suspensionReason}</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
