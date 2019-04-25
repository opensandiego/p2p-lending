from django.contrib import admin
from .models import Profile,Location,Title,Item,Loan,TitleRequest

class ProfileAdmin(admin.ModelAdmin):
    list_display = ("name","user","library_card","active","on_loan","requested","items")
    search_fields = ("name","email","library_card","user__username")
    raw_id_fields = ("user",)

    def active(self,instance):
        return instance.user and instance.user.is_active or False

    def items(self,instance):
        return instance.item_set.exclude(status="unavailable").count()

    def on_loan(self,instance):
        return instance.items_on_loan().count()

    def requested(self,instance):
        return instance.titles_requested().count()
admin.site.register(Profile,ProfileAdmin)

class ItemInline(admin.TabularInline):
    model = Item
    readonly_fields = ("guid","date_added")
    raw_id_fields = ("owner",)

class TitleAdmin(admin.ModelAdmin):
    list_display = ("title","language","media_type","items")
    list_filter = ("media_type","language")
    inlines = [ItemInline]

    def items(self,instance):
        return instance.item_set.exclude(status="unavailable").count()
admin.site.register(Title,TitleAdmin)

class TitleRequestAdmin(admin.ModelAdmin):
    list_display = ("title","requester","status","request_date")
    list_filter = ("status","request_date")
    raw_id_fields = ("requester","title","loan")
admin.site.register(TitleRequest,TitleRequestAdmin)

class LoanAdmin(admin.ModelAdmin):
    list_display = ("item","status","due_date","borrower")
    liat_filter = ("status","due_date")
    raw_id_fields = ("borrower","item","renewal_of")
admin.site.register(Loan,LoanAdmin)

class LocationAdmin(admin.ModelAdmin):
    list_display = ("name","active_users")

    def active_users(self,instance):
        return instance.profile_set.filter(user__is_active=True).count()
admin.site.register(Location,LocationAdmin)
