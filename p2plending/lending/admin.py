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
    list_display = ("title","author","publish_year","language","media_type","items","available","requests")
    list_filter = ("media_type","language")
    search_fields = ("title","author",)
    inlines = [ItemInline]
    actions = ["process_next_request"]

    def requests(self,instance):
        return instance.queued_requests().count()

    def available(self,instance):
        return instance.available_items().count()
        
    def process_next_request(self,request,queryset):
        loans_created = []
        for title in queryset:
            loan = title.process_next_request()
            if loan:
                loans_created.append(loan)
        self.message_user(request,"%i loans created for %i titles" % (len(loans_created),queryset.count()))

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
    list_filter = ("status","due_date")
    search_fields = ("borrower__name","borrower__library_card","item__title__title","item__guid")
    raw_id_fields = ("borrower","item","renewal_of")
    actions = [
        "confirm_lender_dropoff",
        "confirm_borrower_pickup",
        "confirm_borrower_return",
        "confirm_lender_pickup",
        "mark_item_lost",
        "record_return_issue"
    ]

    def confirm_lender_dropoff(self,request,queryset):
        confirmed = 0
        for loan in queryset:
            loan.confirm_lender_dropoff()
            confirmed += 1
        self.message_user(request,"confirmed %i drop offs" % confirmed)

    def confirm_borrower_pickup(self,request,queryset):
        confirmed = 0
        for loan in queryset:
            loan.confirm_borrower_pickup()
            confirmed += 1
        self.message_user(request,"confirmed %i borrower pickups" % confirmed)

    def confirm_borrower_return(self,request,queryset):
        confirmed = 0
        for loan in queryset:
            loan.confirm_borrower_return()
            confirmed += 1
        self.message_user(request,"confirmed %i borrower returns" % confirmed)

    def confirm_lender_pickup(self,request,queryset):
        confirmed = 0
        for loan in queryset:
            loan.confirm_lender_pickup()
            confirmed += 1
        self.message_user(request,"confirmed %i lender pickups" % confirmed)

    def mark_item_lost(self,request,queryset):
        confirmed = 0
        for loan in queryset:
            loan.mark_item_lost()
            confirmed += 1
        self.message_user(request,"marked %i items lost" % confirmed)

    def record_return_issue(self,request,queryset):
        confirmed = 0
        for loan in queryset:
            loan.record_return_issue()
            confirmed += 1
        self.message_user(request,"recored %i issues" % confirmed)

admin.site.register(Loan,LoanAdmin)

class ItemAdmin(admin.ModelAdmin):
    list_display = ("title","owner","status")
    list_filter = ("status","date_added")
admin.site.register(Item,ItemAdmin)

class LocationAdmin(admin.ModelAdmin):
    list_display = ("name","active_users")

    def active_users(self,instance):
        return instance.profile_set.filter(user__is_active=True).count()
admin.site.register(Location,LocationAdmin)
